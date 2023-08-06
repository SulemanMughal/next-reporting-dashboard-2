// Sample log data (replace this with your actual log data)
const logData = `
2023-07-30 10:30:05 INFO User "Alice" logged in.
2023-07-30 11:15:22 ERROR Connection timeout.
2023-07-30 12:00:00 INFO User "Bob" accessed the dashboard.
2023-07-30 13:45:10 WARNING Disk space low.
2023-07-30 14:20:30 ERROR Critical system failure!
`;

function generateQuestionsFromLogs(logData) {
  const questions = [];

  // Split logData into individual log lines
  const logLines = logData.trim().split('\n');

  // Function to generate a random question
  function randomQuestion() {
    const questionTemplates = [
      "What happened at {timestamp}?",
      "Who performed the action at {timestamp}?",
      "What was the log level at {timestamp}?",
      "What is the most recent log message?",
      // Add more question templates as needed.
    ];
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    return template;
  }

  // Generate questions for each log line
  for (const logLine of logLines) {
    const logParts = logLine.split(' ');
    const timestamp = logParts[0] + ' ' + logParts[1];
    const message = logLine.slice(logLine.indexOf(logParts[2]));

    // Generate two random questions for each log line
    for (let i = 0; i < 2; i++) {
      const questionTemplate = randomQuestion();

      // Replace placeholders in the question template with actual values from the log line
      const question = questionTemplate.replace('{timestamp}', timestamp);

      questions.push({ question, message });
    }
  }

  return questions;
}

// Call the function with the provided log data
const generatedQuestions = generateQuestionsFromLogs(logData);

// Print the generated questions and their corresponding log messages
generatedQuestions.forEach(({ question, message }, idx) => {
  console.log(`Q${idx + 1}: ${question}`);
  console.log(`   Log Message: ${message}\n`);
});