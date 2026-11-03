/**
 * ClarionX Super Intelligence (ClarionXSI) - Cloudflare Worker & Backend API
 * Handles static assets, REST API endpoints, and Cloudflare D1 database operations.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Standard CORS & JSON response headers
    const corsHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'X-Content-Type-Options': 'nosniff'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Backend API Routes
    if (url.pathname.startsWith('/api/')) {
      // 1. Health Status Endpoint
      if (url.pathname === '/api/health') {
        let dbStatus = 'disconnected';
        try {
          if (env.DB) {
            await env.DB.prepare('SELECT 1').run();
            dbStatus = 'connected';
          }
        } catch (e) {
          dbStatus = 'error: ' + e.message;
        }

        return new Response(JSON.stringify({
          status: 'healthy',
          app: 'ClarionX Super Intelligence (ClarionXSI)',
          version: '1.0.0',
          environment: 'production',
          timestamp: new Date().toISOString(),
          database: {
            provider: 'Cloudflare D1',
            status: dbStatus,
            database_name: 'clarionxsi-website-db'
          },
          colo: request.cf?.colo || 'UNKNOWN',
          country: request.cf?.country || 'UNKNOWN'
        }, null, 2), { headers: corsHeaders });
      }

      // 2. Products Metadata Endpoint
      if (url.pathname === '/api/products' && request.method === 'GET') {
        const ecosystemProducts = [
          {
            slug: 'one',
            name: 'ClarionX ONE',
            category: 'ai-workspace',
            summary: 'The unified multi-agent AI interface for individuals and enterprises.'
          },
          {
            slug: 'sram',
            name: 'SRAM Models',
            category: 'neural-models',
            summary: 'The SRAM neural model family ranging from Nano 2B to Ultra Frontier 27B+.'
          },
          {
            slug: 'agents',
            name: 'ClarionX AgentCode',
            category: 'autonomous-agents',
            summary: 'Autonomous software engineering, reasoning, and test-driven development agents.'
          },
          {
            slug: 'research',
            name: 'Research Lab',
            category: 'ai-research',
            summary: 'Pioneering frontier alignment, synthetic training datasets, and neural reasoning.'
          },
          {
            slug: 'hub',
            name: 'Integration Hub',
            category: 'enterprise-integrations',
            summary: 'Enterprise connectivity with pre-built connectors and custom API gateways.'
          },
          {
            slug: 'hostel',
            name: 'Hostel Management',
            category: 'vertical-saas',
            summary: 'Comprehensive accommodation management, digital check-in, and billing operations.'
          },
          {
            slug: 'seva',
            name: 'Seva Home Services',
            category: 'domestic-services',
            summary: 'On-demand home maintenance, vetted technicians, cleaning, and repair solutions.'
          },
          {
            slug: 'apexphysio',
            name: 'ClarionX Apexphysio',
            category: 'clinical-health',
            summary: 'Advanced AI motion tracking, assessment, and targeted clinical rehabilitation.'
          }
        ];

        return new Response(JSON.stringify({
          success: true,
          total: ecosystemProducts.length,
          products: ecosystemProducts
        }, null, 2), { headers: corsHeaders });
      }

      // 3. Enquiries API (POST to submit, GET to list)
      if (url.pathname === '/api/enquiries') {
        if (request.method === 'POST') {
          try {
            const body = await request.json();
            const { name, email, product, model, message } = body;

            if (!name || !email || !message) {
              return new Response(JSON.stringify({
                success: false,
                error: 'Fields "name", "email", and "message" are required.'
              }), { status: 400, headers: corsHeaders });
            }

            if (!email.includes('@') || email.length < 5) {
              return new Response(JSON.stringify({
                success: false,
                error: 'Please provide a valid email address.'
              }), { status: 400, headers: corsHeaders });
            }

            const enquiryId = 'enq_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

            if (env.DB) {
              await env.DB.prepare(`
                INSERT INTO enquiries (id, name, email, product, model, message, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, 'new', datetime('now'))
              `).bind(
                enquiryId,
                name.trim(),
                email.trim(),
                product || 'general',
                model || '',
                message.trim()
              ).run();
            }

            return new Response(JSON.stringify({
              success: true,
              id: enquiryId,
              message: 'Your enquiry has been successfully saved to the database.'
            }, null, 2), { status: 201, headers: corsHeaders });
          } catch (err) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Failed to record enquiry: ' + err.message
            }), { status: 500, headers: corsHeaders });
          }
        }

        if (request.method === 'GET') {
          try {
            if (!env.DB) {
              return new Response(JSON.stringify({
                success: false,
                error: 'Database not bound.'
              }), { status: 503, headers: corsHeaders });
            }

            const { results } = await env.DB.prepare(`
              SELECT id, name, email, product, model, message, status, created_at
              FROM enquiries
              ORDER BY created_at DESC
              LIMIT 50
            `).all();

            return new Response(JSON.stringify({
              success: true,
              count: results.length,
              enquiries: results
            }, null, 2), { headers: corsHeaders });
          } catch (err) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Failed to query enquiries: ' + err.message
            }), { status: 500, headers: corsHeaders });
          }
        }
      }

      // 4. Newsletter Subscription Endpoint
      if (url.pathname === '/api/subscribe' && request.method === 'POST') {
        try {
          const { email } = await request.json();
          if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Please provide a valid email.'
            }), { status: 400, headers: corsHeaders });
          }

          const subscriberId = 'sub_' + Date.now();
          if (env.DB) {
            await env.DB.prepare(`
              INSERT OR IGNORE INTO newsletter_subscribers (id, email, created_at)
              VALUES (?, ?, datetime('now'))
            `).bind(subscriberId, email.trim().toLowerCase()).run();
          }

          return new Response(JSON.stringify({
            success: true,
            message: 'Subscribed to ClarionXSI updates successfully.'
          }, null, 2), { status: 201, headers: corsHeaders });
        } catch (err) {
          return new Response(JSON.stringify({
            success: false,
            error: err.message
          }), { status: 500, headers: corsHeaders });
        }
      }

      // 5. Feedback Endpoint
      if (url.pathname === '/api/feedback' && request.method === 'POST') {
        try {
          const { page, rating, feedback } = await request.json();
          const feedbackId = 'fb_' + Date.now();
          if (env.DB) {
            await env.DB.prepare(`
              INSERT INTO site_feedback (id, page, rating, feedback, created_at)
              VALUES (?, ?, ?, ?, datetime('now'))
            `).bind(feedbackId, page || '/', Number(rating) || 5, feedback || '').run();
          }

          return new Response(JSON.stringify({
            success: true,
            message: 'Feedback received with thanks.'
          }, null, 2), { status: 201, headers: corsHeaders });
        } catch (err) {
          return new Response(JSON.stringify({
            success: false,
            error: err.message
          }), { status: 500, headers: corsHeaders });
        }
      }

      return new Response(JSON.stringify({
        error: 'Endpoint not found',
        path: url.pathname
      }), { status: 404, headers: corsHeaders });
    }

    // Static Assets serving via Cloudflare Assets
    if (env.ASSETS) {
      let response = await env.ASSETS.fetch(request);

      // Handle 404 fallback to custom 404.html
      if (response.status === 404) {
        const notFoundReq = new Request(new URL('/404.html', request.url), request);
        const notFoundRes = await env.ASSETS.fetch(notFoundReq);
        if (notFoundRes.status === 200) {
          return new Response(notFoundRes.body, {
            status: 404,
            headers: notFoundRes.headers
          });
        }
      }

      return response;
    }

    return new Response('ClarionXSI service active.', { status: 200 });
  }
};
