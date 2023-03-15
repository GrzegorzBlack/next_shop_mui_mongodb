const handleData = async (expr, body, route) => {
  const response = await fetch(`/api/${route}`, {
    method: expr,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export default handleData;
