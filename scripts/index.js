const fs = require('fs');

// Read JSON data from the file
fs.readFile('../psql.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse JSON data
    const questions = JSON.parse(data);

    // Start the Markdown content
    let markdownContent =
      '# PostgreSQL Questions and Answers\n\n' +
      'This document contains a collection of questions and answers related to PostgreSQL. ' +
      'It covers a wide range of topics, from basic concepts to advanced features.\n\n';

    // Generate table of contents and question/answer sections
    // questions.forEach((q) => {
    //   const anchor = q.question
    //     .toLowerCase()
    //     .replace(/[^a-zA-Z0-9 ]/g, '')
    //     .replace(/\s+/g, '-');
    //   markdownContent += `1. [${q.question}](#${anchor})\n`;
    // });

    markdownContent += '\n';

    questions.forEach((q, id) => {
      const anchor = q.question
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '-');
      markdownContent += `## ${id + 1}. ${q.question}\n\n ${q.answer}\n\n`;
    });

    // Write Markdown content to README.md
    fs.writeFile('README.md', markdownContent, (err) => {
      if (err) {
        console.error('Error writing to README.md:', err);
        return;
      }
      console.log('README.md file has been created successfully.');
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
