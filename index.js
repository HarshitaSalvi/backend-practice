import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { parseData, validateFile } from './utils.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// GET endpoint
app.get('/', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', async (req, res) => {
  try {
    const { data = [], file_b64 = '' } = req.body;

    const user_id = "harsh_92004"; // replace with your actual details
    const email = "harry.in";
    const roll_number = "0827CS221105";

    const { numbers, alphabets, highestLower, hasPrime } = parseData(data);
    const { isValid, mimeType, sizeKB } = await validateFile(file_b64);

    return res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLower,
      is_prime_found: hasPrime,
      file_valid: isValid,
      file_mime_type: mimeType,
      file_size_kb: sizeKB
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ is_success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
