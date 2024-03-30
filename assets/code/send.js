// Declare peer variable in the global scope
let peer;

// Function to initialize Peer connection
function initializePeerConnection() {
    // Initialize PeerJS and establish connection
    const customId = gen(5); // Set your desired custom ID here
    peer = new Peer(customId); // Pass the custom ID when creating the Peer instance
    let connection;
    let myid = undefined;

    peer.on('open', (id) => {
        myid = id;
        masschange('mcode', id);
        console.log('<i> Opened PeerJS migrator! Waiting...');
    });

    peer.on('connection', (conn) => {
        console.log('<i> Connection started.');
        conn.on('data', async (data) => {
            const name = data.name;
            const blob = data.blob;
            const reader = new FileReader();
            const content = await new Response(blob).text()
            reader.readAsText(blob);
            console.log(name);
            console.log(content);
            window.updatefilesList();
        });

        connection = conn;
    });
}

// Function to send data
async function senda(content, name) {
    // Create a generic blob containing content
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const data = { name: name, blob: blob }; // Send blob directly
    const peerIdInput = document.getElementById('peerIdInput');
    const otherPeerId = peerIdInput.value;
    if (!otherPeerId) {
        mkw('<p>Missing ID! Please enter one.</p>', 'Error')
        return;
    }

    const newConnection = peer.connect(otherPeerId);
    newConnection.on('open', () => {
        console.log('Connected to peer:', otherPeerId);
        connection = newConnection;
        connection.send(data, function () {
            mkw('<p>Migrated successfully.</p><p>Everything should be just how you had it!</p><button class="b1">Erase This WebDesk</button>', 'Migration Complete', '250px');
        });
    });

    newConnection.on('error', (err) => {
        console.error('Error connecting to peer:', err);
        mkw(`<p>Couldn't connect to other WebDesk.</p><p>Check your ID, and make sure you're on the same network as the other WebDesk.</p>`, 'Error', '300px');
    });
}

// Event listener for window load
window.addEventListener('DOMContentLoaded', function () {
    initializePeerConnection();
});
