import express from 'express';
import axios from 'axios';

const router = express.Router();

const GITHUB_USER = process.env.GITHUB_USERNAME || 'janeshkrish';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// ── GITHUB ────────────────────────────────────────────────────────────────
router.get('/github', async (_, res) => {
  const fetchGithub = async (useToken) => {
    const headers = {
      'User-Agent': 'NeoBrutalismPortfolio/1.0',
      ...(useToken && GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {})
    };

    const [userRes, reposRes, eventsRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
      axios.get(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`, { headers }),
    ]);

    const user = userRes.data;
    const repos = reposRes.data;
    const events = eventsRes.data;

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentPushes = events.filter(
      (e) => e.type === 'PushEvent' && new Date(e.created_at) > thirtyDaysAgo
    ).length;

    return {
      username: user.login,
      name: user.name,
      avatar: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      recentPushes,
      topRepos: repos.slice(0, 6).map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        updatedAt: r.updated_at,
      })),
    };
  };

  try {
    let data;
    try {
      data = await fetchGithub(true);
    } catch (e) {
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        console.warn('GitHub token auth failed, falling back to unauthenticated request.');
        data = await fetchGithub(false);
      } else {
        throw e;
      }
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── LEETCODE ─────────────────────────────────────────────────────────────
router.get('/leetcode', async (_, res) => {
  const LEETCODE_USER = 'janeshkrishna';
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            reputation
            ranking
          }
          badges { name }
          activeBadge { displayName }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
      }
    `;

    const response = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables: { username: LEETCODE_USER } },
      {
        headers: {
          'Content-Type': 'application/json',
          Referer: 'https://leetcode.com',
          'User-Agent': 'Mozilla/5.0',
        },
        timeout: 10000,
      }
    );

    const data = response.data?.data;
    const user = data?.matchedUser;
    const contest = data?.userContestRanking;

    if (!user) return res.json({ success: false, message: 'User not found on LeetCode' });

    const stats = user.submitStats?.acSubmissionNum || [];
    const getCount = (diff) => stats.find((s) => s.difficulty === diff)?.count || 0;

    res.json({
      success: true,
      data: {
        username: LEETCODE_USER,
        totalSolved: getCount('All'),
        easySolved: getCount('Easy'),
        mediumSolved: getCount('Medium'),
        hardSolved: getCount('Hard'),
        ranking: user.profile?.ranking,
        contestRating: contest?.rating ? Math.round(contest.rating) : null,
        contestAttended: contest?.attendedContestsCount,
        globalRanking: contest?.globalRanking,
        topPercentage: contest?.topPercentage,
        badges: user.badges?.length || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── CODECHEF ─────────────────────────────────────────────────────────────
router.get('/codechef', async (_, res) => {
  const CC_USER = 'kgisl_23it17';
  try {
    // Use codechef-api or scrape the user profile page
    const response = await axios.get(`https://www.codechef.com/users/${CC_USER}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
      timeout: 10000,
    });

    const html = response.data;

    // Extract rating using cheerio
    const { load } = await import('cheerio');
    const $ = load(html);

    const rating = $('.rating-number').first().text().trim();
    const stars = $('.rating-star').first().text().trim();
    const globalRank = $('.rating-ranks ul li:first-child strong').text().trim();
    const countryRank = $('.rating-ranks ul li:last-child strong').text().trim();

    // Fully solved count
    const fullyPractised = $('.problems-solved h5')
      .filter((_, el) => $(el).text().includes('Fully Solved'))
      .next('p')
      .text()
      .trim();

    res.json({
      success: true,
      data: {
        username: CC_USER,
        rating: rating || 'N/A',
        stars: stars || 'N/A',
        globalRank: globalRank || 'N/A',
        countryRank: countryRank || 'N/A',
        problemsSolved: fullyPractised || 'N/A',
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
