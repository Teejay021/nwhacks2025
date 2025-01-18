export default function handler(req, res) {
  if (req.method === 'POST') {
    const { question } = req.body;

    // Mock AI response
    const mockResponse = {
      answer: `This is a mock response to your question: "${question}"`,
    };

    res.status(200).json(mockResponse);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}