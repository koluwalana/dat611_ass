/**
 * Main function to fetch API data, transform it, and plot using tfjs-vis.
 */
async function fetchAndPlotData() {
    const statusEl = document.getElementById('status');
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        // 1. Remote API Call
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();

        // 2. Transform Data
        // We are transforming the array of user objects into a format 
        // the tfjs barchart understands: { index: string, value: number }
        const chartData = users.map(user => ({
            index: user.username, // X-axis label
            value: user.name.length // Y-axis value (length of their full name)
        }));

        // 3. Plot using Tensorflow.js Visor
        const container = {
            name: 'User Name Lengths',
            tab: 'User Statistics'
        };

        const options = {
            xLabel: 'Username',
            yLabel: 'Full Name Character Count',
            height: 400
        };

        // Render the bar chart in the visor
        tfvis.render.barchart(container, chartData, options);
        
        statusEl.innerText = "";

    } catch (error) {
        console.error('Error:', error);
        statusEl.innerText = "Failed to load data. Check the console for details.";
    }
}

// Execute the function when the page loads
window.onload = fetchAndPlotData;