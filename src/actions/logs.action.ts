"use server"
import fs from 'fs/promises';

export const getlogs = async () => {
    try {
        // Read the content of the combined.log file
        const logContent = await fs.readFile('combined.log', 'utf-8');
        
        // Split the log content by lines
        const logLines = logContent.split('\n').filter(line => line.trim() !== '');
        
        // Parse each line as JSON and create an array of log entries
        const logEntries = logLines.map(line => JSON.parse(line));
        
        console.log(logEntries);
        return logEntries;
    } catch (error) {
        console.error('Error reading log file:', error);
        throw new Error('Error reading log file');
    }
}
