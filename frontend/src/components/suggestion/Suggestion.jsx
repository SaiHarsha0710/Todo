import React, { useState } from 'react';
import './Suggestion.css';


import emailjs from '@emailjs/browser';


const Suggestions = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading spinner

        const serviceId = 'service_esbrx9c';
        const templateId = 'template_9m27f78';
        const publicKey = 'uioPLRbAN7NB6zYyN';

        const templateParams = {
            from_name: name,
            from_email: email,
            from_subject: subject,
            message: message,
        };

        try {
            const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log('Email successfully sent!', response);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            alert('Thanks for reaching me!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div id="contactPage">
            <div id="contact">
                <h1 className="contactPageTitle">Suggestions about Website</h1>
                <span className="contactDesc">Please fill out the form below to give Suggestions about website.</span>
                <form className="contactForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="name"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="email"
                        placeholder="Your Email Account"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="subject"
                        placeholder="Suggestion Theme"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                    <textarea
                        name="message"
                        className="msg"
                        rows="5"
                        placeholder="Suggest the upgrades about the project"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit" className="submitBtn" disabled={loading}>
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>
                <div className="links">
                <a href="https://www.linkedin.com/in/venkatasaiharsha/"><img src="/link.jpeg" alt="Client 1" className="clientImg" /></a>
                    <a href="https://github.com/SaiHarsha0710"><img src="/8.png" alt="Client 2" className="clientImg" /></a>
                    <a href="https://leetcode.com/u/Harsha_0710/"><img src="/leetcode.png" alt="Client 3" className="clientImg" /></a>
                    <a href="https://www.geeksforgeeks.org/user/maddinenivenkb8qm/"><img src="/GFG.jpeg" alt="Client 4" className="clientImg" /></a>
                </div>
                
            </div>
            </div>
    );
};

export default Suggestions;
