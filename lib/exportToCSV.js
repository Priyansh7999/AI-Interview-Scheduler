import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const exportToCSV = (candidates) => {
  const data = candidates.map(c => ({
    Name: c.userName,
    Email: c.userEmail,
    Recommended: c.feedback?.rating?.OverallRating >= 7 ? 'Yes' : 'No',
    Score: c.feedback?.rating?.OverallRating || 0,
    TechnicalSkills: c.feedback?.rating?.TechnicalSkills || 0,
    Communication: c.feedback?.rating?.Communication || 0,
    ProblemSolving: c.feedback?.rating?.ProblemSolving  || 0,
    Experience: c.feedback?.rating?.Experience || 0,
    Behavioral: c.feedback?.rating?.Behavioral || 0,
    Thinking: c.feedback?.rating?.Analysis || 0,
    Recommendation: c.feedback?.Recommendation || '',
    RecommendationMessage: c.feedback?.["Recommendation Message"] || '',
    Summary: c.feedback?.summary
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "candidates.csv");
};

export default exportToCSV;