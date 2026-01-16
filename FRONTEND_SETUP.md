# Frontend Configuration Setup

## Environment Variables

Create a `.env.local` file in the root directory of the frontend (Website_Revamp folder) with the following:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### For Production

When deploying to production, update the API URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Important Notes

- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- After adding or changing environment variables, restart your Next.js development server
- For Vercel deployment, add these variables in the Vercel project settings

## Testing Locally

1. Make sure your backend is running on port 5000
2. Make sure your frontend is running (usually on port 3000)
3. Test the guide download form
4. Check the browser console for any API errors
5. Check the backend terminal for request logs

