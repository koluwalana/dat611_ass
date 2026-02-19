/**
 * Main function to fetch data and render multiple chart types
 */
async function runVisualization() {
    const statusEl = document.getElementById('status');
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        statusEl.innerText = "Fetching data...";
        const response = await fetch(url);
        const users = await response.json();

        // --- 1. BAR CHART DATA ---
        // Showing: Username vs Length of Full Name
        const barData = users.map(u => ({
            index: u.username,
            value: u.name.length
        }));

        // --- 2. LINE CHART DATA ---
        // Showing: User ID vs Length of their Website URL (Trend analysis)
        const lineData = users.map(u => ({
            x: u.id,
            y: u.website.length
        }));

        // --- 3. SCATTER PLOT DATA ---
        // Showing: Correlation between Name length and Email length
        const scatterData = users.map(u => ({
            x: u.name.length,
            y: u.email.length
        }));

        // RENDER SECTION
        statusEl.innerText = "Rendering charts in Visor...";

        // Render Bar Chart
        tfvis.render.barchart(
            { name: 'Name Lengths', tab: 'Charts' }, 
            barData, 
            { xLabel: 'User', yLabel: 'Char Count', height: 300 }
        );

        // Render Line Chart
        tfvis.render.linechart(
            { name: 'Website URL Length Trend', tab: 'Charts' }, 
            { values: [lineData], series: ['URL Length'] }, 
            { xLabel: 'User ID', yLabel: 'Length', height: 300 }
        );

        // Render Scatter Plot
        tfvis.render.scatterplot(
            { name: 'Name vs Email Length Correlation', tab: 'Analysis' }, 
            { values: [scatterData], series: ['Users'] }, 
            { xLabel: 'Name Length', yLabel: 'Email Length', height: 300 }
        );

        statusEl.innerHTML = "✅ <strong>Success!</strong> Open the Visor panel on the right (or press '`' backtick key) to view the Charts and Analysis tabs.";

    } catch (error) {
        statusEl.innerText = "Error: " + error.message;
        console.error(error);
    }
}

window.onload = runVisualization;