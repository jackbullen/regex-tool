import React, {useState, useEffect} from 'react';

const RegexTester = () => {
    const [regex, setRegex] = useState('')
    const [testString, setTestString] = useState('');
    const [isMatch, setIsMatch] = useState(false);
    const [highlightedTestString, setHighlightedTestString] = useState('');
    
    const handleRegexChange = (event) => {
        setRegex(event.target.value);
    }

    const handleTestStringChange = (event) => {
        setTestString(event.target.value);
    };

    useEffect(() => {
        try {
            if (regex === '') {
                setHighlightedTestString(testString);
                setIsMatch(false);
                return;
            }
            console.log(regex, testString);
            const re = new RegExp(regex, 'g');
            const res = testString.replace(re, (e) => {return `<span class='bg-yellow-500'>${e}</span>`});
            if (res!==testString) {
                setHighlightedTestString(res);
                setIsMatch(true);
            } else {
                setHighlightedTestString(res);
                setIsMatch(false);
            }
        } catch (err) {
            setIsMatch(false);
            setHighlightedTestString(testString);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regex, testString]);

    return (
        <div className="regex-tester">
            <h1 className='text-3xl font-bold py-10'>Regular Expression Tester</h1>
            <div>
                <div>
                    <input
                        className='w-full mx-2 px-2 py-1 bg-black border-2 border-gray-300 rounded-md'
                        type="text"
                        placeholder="Enter a regular expression"
                        value={regex}
                        onChange={handleRegexChange}
                    />
                </div>
                <div className='h-48 py-1'>
                    <textarea
                        className='w-full h-full mx-2 my-2 px-2 py-1 border-2 bg-black border-gray-300 rounded-md'
                        type="text"
                        placeholder="Enter a string"
                        value={testString}
                        onChange={handleTestStringChange}
                    />
                </div>
            </div>
            <div className='my-5'>
            {isMatch !== null && (
                <p className={`text-3xl ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
                    {isMatch ? 'Match' : 'No Match'}
                </p>
            )}
            <div dangerouslySetInnerHTML={{__html: highlightedTestString}}></div>
            </div>
        </div>
    );
};

export default RegexTester