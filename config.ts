const api_url = `https://admin.myattacademy.com/api`;

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_PREFIX}`;

export const config = {
  API_URL: API_URL || api_url,
};
