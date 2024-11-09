const fs = require('fs');

function parseTeamsFromFile(filePath) {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Remove extra whitespace and split by teams based on the pattern '{ ... }'
    const teamBlocks = fileContent.match(/{[\s\S]*?}/g);
    
    // Process each team block
    const teams = teamBlocks.map(block => {
        // Remove braces and split lines
        const lines = block.replace(/[{}]/g, '').trim().split('\n');
        
        // First line is the team name, rest are emails
        const teamName = lines[0].trim();
        const members = lines.slice(1).map(line => line.trim());
        
        return { teamName, members };
    });
    
    return teams;
}


// New endpoint to parse teams from a file and import them
app.post('/api/import-from-file', async (req, res) => {
    const filePath = "./course_roaster.txt";
    const teams = parseTeamsFromFile(filePath);

    // Set up the req.body to match the expected format for importTeams
    req.body = { teams, instructor: true };

    // Call importTeams function directly
    await importTeams(req, res);
});
