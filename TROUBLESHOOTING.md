# Network Connectivity Troubleshooting

## Current Issue: `ERR_CONNECTION_TIMED_OUT`

Your environment variables are working correctly (✅ TMDB Key: Found, ✅ OpenAI Key: Found), but you're experiencing network connectivity issues with the TMDB API.

## Quick Fixes to Try

### 1. **Check Your Internet Connection**
- Try accessing other websites to confirm your internet is working
- Try accessing https://api.themoviedb.org/3/movie/popular?language=en-US&page=1 directly in your browser

### 2. **Restart Your Development Server**
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm start
```

### 3. **Clear Browser Cache**
- Open Developer Tools (F12)
- Right-click the refresh button
- Select "Empty Cache and Hard Reload"

### 4. **Try Different Network**
- Switch to mobile hotspot
- Try a different WiFi network
- Disable VPN if you're using one

### 5. **Check Firewall/Antivirus**
- Temporarily disable firewall/antivirus
- Check if they're blocking API calls
- Add localhost:3000 to allowed sites

### 6. **DNS Issues**
- Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)
- Flush DNS cache:
  ```bash
  # Windows
  ipconfig /flushdns
  
  # Mac
  sudo dscacheutil -flushcache
  ```

### 7. **Proxy Issues**
- If you're behind a corporate proxy, configure it properly
- Check if your network blocks certain APIs

## Advanced Solutions

### 8. **Use a Different API Endpoint**
If TMDB is down, you can temporarily use a different endpoint or mock data.

### 9. **Check TMDB API Status**
- Visit: https://status.themoviedb.org/
- Check if TMDB is experiencing issues

### 10. **Network Diagnostics**
```bash
# Test connectivity to TMDB
ping api.themoviedb.org

# Test with curl
curl -I https://api.themoviedb.org/3/movie/popular
```

## Temporary Workaround

If the issue persists, you can add a retry mechanism:

```javascript
// Add this to your API hooks
const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## Common Causes

1. **Network Congestion**: Try again in a few minutes
2. **ISP Issues**: Contact your internet provider
3. **Corporate Firewall**: Contact your IT department
4. **Geographic Restrictions**: Use a VPN if needed
5. **API Rate Limiting**: Wait a few minutes before retrying

## When to Contact Support

- If the issue persists across different networks
- If you can access other websites but not the API
- If the problem continues for more than 24 hours

## Quick Test

Try this in your browser console to test the API directly:

```javascript
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
  headers: {
    'Authorization': 'Bearer YOUR_TMDB_API_KEY'
  }
}).then(r => r.json()).then(console.log).catch(console.error);
```

Replace `YOUR_TMDB_API_KEY` with your actual API key. 