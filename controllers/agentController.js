

import axios from 'axios';
import Agent from '../models/Agent.js';

export const syncAgentsFromKWPeople = async (req, res) => {
  try {
    // 1. Input: Org ID and filters
    const org_id = req.params.org_id;
    console.log('Requested org_id:', org_id);
    const activeFilter = req.query.active;
    const page = Number(req.query.page ?? 1);
    const perPage = req.query.limit ? Number(req.query.limit) : 50;

    if (!org_id) {
      return res.status(400).json({ success: false, message: 'Missing route param: org_id' });
    }

    // 2. Headers and base URL
    const headers = {
      Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
      Accept: 'application/json',
    };
    const baseURL = `https://partners.api.kw.com/v2/listings/orgs/${org_id}/people`;

    // 3. Fetch all pages (if API supports offset-based pagination)
    let allPeople = [];
    let offset = 0;
    const apiLimit = req.query.limit ? Number(req.query.limit) : undefined;
    let first = true;
    let totalCount = 0;

    do {
      let url = `${baseURL}?page[offset]=${offset}`;
      if (apiLimit !== undefined) url += `&page[limit]=${apiLimit}`;
      console.log('Calling KW API URL:', url);
      const response = await axios.get(url, { headers });
       console.log('KW People API Response:', JSON.stringify(response.data, null, 2));

      // Try to get people from different possible keys
      let peoplePage = [];
      if (Array.isArray(response.data?.people)) {
        peoplePage = response.data.people;
      } else if (Array.isArray(response.data?.results)) {
        peoplePage = response.data.results;
      } else if (Array.isArray(response.data?.data)) {
        peoplePage = response.data.data;
      } else {
        console.warn('KW API returned no recognizable people array.');
      }

      if (first) {
        totalCount = response.data?.pagination?.total ?? peoplePage.length;
        first = false;
      }

      if (!Array.isArray(peoplePage)) break;
      if (peoplePage.length === 0) {
        console.warn('KW API returned an empty people array for this page.');
      }
      allPeople = allPeople.concat(peoplePage);
      console.log("Total people received from KW so far:", allPeople.length);
      if (allPeople.length > 0) {
        console.log("First person sample:", allPeople[0]);
      }

      offset += apiLimit;
    } while (offset < totalCount);

    // 4. Filter by `active` if present
    if (activeFilter !== undefined) {
  const isActive = activeFilter === 'true';
  allPeople = allPeople.filter(p => (p.active !== false) === isActive);
  console.log(`After active filter (${isActive}):`, allPeople.length);
}

    // 5. If no people found, return early
    if (allPeople.length === 0) {
      console.warn('No agents found in KW API for org_id:', org_id);
      return res.status(200).json({
        success: true,
        message: 'No agents found in KW API for this org_id.',
        org_id,
        data: [],
        total: 0,
      });
    }

    // 6. Sync to DB
    const syncedAgents = [];
    for (const person of allPeople) {
      const {
        kw_uid,
         // <-- use this
        first_name,
        last_name,
        photo,
        email,
        phone,
        market_center_number,
        city,
        active,
        slug,
      } = person;

      if (!kw_uid || !first_name) {
        console.warn('Skipping person due to missing kw_uid or first_name:', person);
        continue;
      }

      const generatedSlug = slug || kw_uid.toString().toLowerCase();

      const agentData = {
        slug: generatedSlug,
        kwId: kw_uid,
        fullName: `${first_name} ${last_name || ''}`.trim(),
        lastName: last_name || '',
        email: email || '',
        phone: phone || '',
        marketCenter: market_center_number || '',
        city: city || '',
        active: active !== false,
        photo: photo || '',
      };

      try {
      const updatedAgent = await Agent.findOneAndUpdate(
        { slug: generatedSlug },
        agentData,
        { new: true, upsert: true, runValidators: true }
      );
      syncedAgents.push(updatedAgent);
      } catch (dbErr) {
        console.error('Error syncing agent to DB:', dbErr.message, agentData);
      }
    }

    // 7. Paginate response
    const paginated = syncedAgents.slice((page - 1) * perPage, page * perPage);

    // 8. Send response
    if (syncedAgents.length === 0) {
      console.warn('No agents were saved to the database for org_id:', org_id);
      return res.status(200).json({
        success: true,
        message: 'No agents were saved to the database for this org_id.',
        org_id,
        total: 0,
        page,
        per_page: perPage,
        count: 0,
        data: [],
      });
    }
    res.status(200).json({
      success: true,
     org_id,
      total: syncedAgents.length,
      page,
      per_page: perPage,
      count: paginated.length,
      data: paginated,
    });

  } catch (error) {
    console.error('KW People Sync Error:', error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to sync agents',
      error: error.message,
    });
  }
};

export const syncAgentsFromMultipleKWPeople = async (req, res) => {
  try {
    const orgIds = ['50449', '2414288'];
    const activeFilter = req.query.active;
    const page = Number(req.query.page ?? 1);
    const perPage = req.query.limit ? Number(req.query.limit) : 50;
    let allPeople = [];

    for (const org_id of orgIds) {
      const headers = {
        Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
        Accept: 'application/json',
      };
      const baseURL = `https://partners.api.kw.com/v2/listings/orgs/${org_id}/people`;
      let offset = 0;
      const apiLimit = req.query.limit ? Number(req.query.limit) : undefined;
      let first = true;
      let totalCount = 0;
      do {
        let url = `${baseURL}?page[offset]=${offset}`;
        if (apiLimit !== undefined) url += `&page[limit]=${apiLimit}`;
        const response = await axios.get(url, { headers });
        let peoplePage = [];
        if (Array.isArray(response.data?.people)) {
          peoplePage = response.data.people;
        } else if (Array.isArray(response.data?.results)) {
          peoplePage = response.data.results;
        } else if (Array.isArray(response.data?.data)) {
          peoplePage = response.data.data;
        }
        if (first) {
          totalCount = response.data?.pagination?.total ?? peoplePage.length;
          first = false;
        }
        if (!Array.isArray(peoplePage)) break;
        allPeople = allPeople.concat(peoplePage);
        offset += apiLimit;
      } while (offset < totalCount);
    }

    // Filter by active if present
    if (activeFilter !== undefined) {
      const isActive = activeFilter === 'true';
      allPeople = allPeople.filter(p => (p.active !== false) === isActive);
    }

    // Remove duplicates by slug (or kw_uid if slug missing)
    const seen = new Set();
    const uniquePeople = [];
    for (const person of allPeople) {
      const slug = person.slug || (person.kw_uid ? person.kw_uid.toString().toLowerCase() : undefined);
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        uniquePeople.push(person);
      }
    }

    // Sync to DB
    const syncedAgents = [];
    for (const person of uniquePeople) {
      const {
        kw_uid,
        first_name,
        last_name,
        photo,
        email,
        phone,
        market_center_number,
        city,
        active,
        slug,
      } = person;
      if (!kw_uid || !first_name) continue;
      const generatedSlug = slug || kw_uid.toString().toLowerCase();
      const agentData = {
        slug: generatedSlug,
        kwId: kw_uid,
        fullName: `${first_name} ${last_name || ''}`.trim(),
        lastName: last_name || '',
        email: email || '',
        phone: phone || '',
        marketCenter: market_center_number || '',
        city: city || '',
        active: active !== false,
        photo: photo || '',
      };
      try {
        const updatedAgent = await Agent.findOneAndUpdate(
          { slug: generatedSlug },
          agentData,
          { new: true, upsert: true, runValidators: true }
        );
        syncedAgents.push(updatedAgent);
      } catch (dbErr) {
        // skip DB errors for now
      }
    }

    // Paginate response
    const paginated = syncedAgents.slice((page - 1) * perPage, page * perPage);
    res.status(200).json({
      success: true,
      org_ids: orgIds,
      total: syncedAgents.length,
      page,
      per_page: perPage,
      count: paginated.length,
      data: paginated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to sync agents from multiple orgs',
      error: error.message,
    });
  }
};

// Get filtered agents with pagination
export const getFilteredAgents = async (req, res) => {
  try {
    const { name, marketCenter, city, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (name) {
      filter.fullName = { $regex: name, $options: 'i' };
    }
    if (marketCenter && marketCenter !== "MARKET CENTER") {
      filter.marketCenter = { $regex: `^${marketCenter}$`, $options: 'i' };
    }
    if (city && city !== "CITY" && city !== "RESET_ALL") {
      filter.city = { $regex: `^${city}$`, $options: 'i' };
    }

    console.log('Agent filter:', filter); // Debug log

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Agent.countDocuments(filter);
    const agents = await Agent.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      count: agents.length,
      data: agents,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



