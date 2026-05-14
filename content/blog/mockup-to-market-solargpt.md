---
title: "From Mockup to Market: SolarGPT"
description: A detailed breakdown of how I'm building SolarGPT — from data architecture decisions to agent workflows to spec-driven design — with the tradeoffs and course-corrections along the way.
date: 2026-05-13
image: /gea-regions.avif
minRead: 8
author:
  name: Admin
  avatar:
    src: /nysgpt-badge.png
    alt: NYSgpt
---

Building SolarGPT has reinforced something I already suspected: the hard part of an AI product isn't the model, it's the scaffolding around it. The data sources you trust, the questions you let users ask, the agent workflow that turns prose into SQL — those decisions compound. Get them right and the product performs well, very well. Get them wrong and it does not.

This is a walkthrough of how SolarGPT (solar.nysgpt.com) actually came together, including the dead ends.

## Phase 1: Framing the Product

The temptation with anything energy-adjacent is to build everything: rooftop solar, wholesale markets, grid , etc., all wrapped into one. It was hard to resist that urge.

The correct approach turned out to be a singular focus on solar first.

Two question, two answers:

- **"Should I install solar on my roof?"** — ROI, panel counts, capacity, carbon offset. For this question slow-moving, annual averages work.
- **"What is solar generation worth?"** — Statewide? By county? By town? Zip code? To my neighborhood? My block? That's how far we drilled down. 

We did this to empower collective action by endusers: a civic org., school district, municipality, if one mid-sized organization looks at it's rooftops the benefits are in the tens of millions.

## Phase 2: Data Architecture

Before any UI work, I spent real time mapping data sources to product questions. This is the part most people skip, and that's because it's a pain in the ass, but this is the part that determines whether the agent will give a useful answer.

The current Postgres setup (`solargpt` schema):

- **KPI views** — pre-aggregated answers to the most common rooftop questions
- **NREL 2024 tables** — NREL's scenario-based long-run electricity values
- **EIA 860 / 861 / 930** — plant locations, service territories, hourly grid ops
- **NYISO queue data** — interconnection pipeline, parked for Phase 2
- **Project Sunroof tables** — county/city/postal/tract-level rooftop potential

A specific lesson that cost me a half-day: EIA's `facility-fuel` endpoint has generation time-series but no lat/lon. The Plant file from EIA-860 has lat/lon but no generation. To do anything map-shaped you have to join them on `plant_code`. GridStatus does this; so now does SolarGpt.

Similarly for balancing authority polygons — county dissolution from EIA-861 service territory data technically works, but the DOE ArcGIS FeatureServer publishes the 71 BA polygons directly in WGS84 GeoJSON with no auth required. One query string and you're done: [ArcGIS](https://arcgis.netl.doe.gov/server/rest/services/Hosted/Control__Areas/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson)

That's a start. We'll disclose more on the AI Layer later, but for now I'd leave you with this:

> AI products live or die on the boring infrastructure underneath the chat box. The model is the easy part now. Picking the right data, shaping the right workflow, and saying no to the wrong scope — that's work.

More to come...