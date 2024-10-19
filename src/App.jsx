import { useState } from 'react';

function App() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState({ content: '', headings: [], paragraphs: [] });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error before fetching
        const response = await fetch('http://localhost:5000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (response.ok) {
            const data = await response.json();
            setResult(data); // Ensure this correctly sets the result
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to scrape the website');
            setResult({ content: '', headings: [], paragraphs: [] });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="text-center flex items-center">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to scrape"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Scrape</button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {!error && (
                <>
                    <h2>Headings</h2>
                    <ul>
                        {result.headings.length > 0 ? (
                            result.headings.map((heading, index) => (
                                <li key={index}>{heading}</li>
                            ))
                        ) : (
                            <li>No headings found</li>
                        )}
                    </ul>

                    <h2>Paragraphs</h2>
                    <ul>
                        {result.paragraphs.length > 0 ? (
                            result.paragraphs.map((paragraph, index) => (
                                <li key={index}>{paragraph}</li>
                            ))
                        ) : (
                            <li>No paragraphs found</li>
                        )}
                    </ul>
                </>
            )}
        </>
    );
}

export default App;
