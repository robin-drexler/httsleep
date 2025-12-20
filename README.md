# 😴 httsleep

A simple service for producing delayed HTTP responses. Perfect for testing how your applications handle slow network requests, timeouts, and loading states.

## Why httsleep?

- Test how your UI handles slow API responses (loading spinners, skeleton screens)
- Verify timeout behavior in HTTP client libraries
- Simulate network latency that Chrome DevTools throttling can't replicate
- Test async scenarios where requests take longer than your normal environment

## Live Service

httsleep is available at: **https://httsleep.r10r.dev**

---

## Features

### ⏱️ Simple Delay

Returns a `200 OK` response after waiting the specified number of seconds.

**Pattern:** `/:seconds`

**Examples:**

```
https://httsleep.r10r.dev/3      # Wait 3 seconds
https://httsleep.r10r.dev/0.5    # Wait 500ms
https://httsleep.r10r.dev/10     # Wait 10 seconds
```

**Usage:**

```javascript
// Test a 5-second timeout
fetch("https://httsleep.r10r.dev/5")
  .then((response) => console.log("Response received after 5 seconds"))
  .catch((error) => console.log("Request failed or timed out"));
```

---

### ↪️ Delayed Redirect

Redirects to the specified URL after waiting. Returns a `301` redirect response.

**Pattern:** `/:seconds?redirectUrl=:url`

**Examples:**

```
https://httsleep.r10r.dev/3?redirectUrl=https://httpbin.org/headers
https://httsleep.r10r.dev/2?redirectUrl=https://example.com
```

**Usage:**

```javascript
// Test redirect handling with network latency
fetch("https://httsleep.r10r.dev/2?redirectUrl=https://api.example.com/data", {
  redirect: "follow",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

---

### 🔀 Delayed Proxy

Fetches a URL and returns its response after the delay. The original response headers and status code are preserved.

**Pattern:** `/:seconds?proxyUrl=:url`

**Examples:**

```
https://httsleep.r10r.dev/3?proxyUrl=https://httpbin.org/json
https://httsleep.r10r.dev/5?proxyUrl=https://api.github.com/users/octocat
```

**Usage:**

```javascript
// Simulate a slow API response with real data
fetch(
  "https://httsleep.r10r.dev/3?proxyUrl=https://jsonplaceholder.typicode.com/posts/1"
)
  .then((response) => response.json())
  .then((data) => console.log("Received after 3 seconds:", data));
```
