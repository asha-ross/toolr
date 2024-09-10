import React from 'react'

const Help: React.FC = () => {
  const faqs = [
    {
      question: 'What is ToolR about?',
      answer:
        'ToolR is a platform that allows users to rent tools from other individuals in their local area.',
    },
    {
      question: 'How does tool rental work on this platform?',
      answer:
        'Users can list their tools for rent or browse available tools to rent. Once you find a tool you need, you can request to rent it for a specified period.',
    },
    {
      question: 'Is ToolR available in my area?',
      answer:
        "We're currently operating across New Zealand. Mostly. We're constantly expanding, so check back if your area isn't currently covered!",
    },
    {
      question: 'How do I create an account?',
      answer:
        "Click on the Sign Up button in the top right corner of the homepage. You'll need to provide a valid email address and create a password.",
    },
    {
      question: 'Can I use ToolR without creating an account?',
      answer:
        "You can browse available tools without an account, but you'll need to create one to rent or list tools.",
    },
    {
      question: 'How do I rent a tool?',
      answer:
        'Browse or search for the tool you need, select it, choose your rental dates, and submit a rental request. The tool owner will then approve or decline your request.',
    },
    {
      question: "What if the tool I need isn't available?",
      answer:
        "You can set up alerts for specific tools. We'll notify you when they become available.",
    },
    {
      question: 'How long can I rent a tool for?',
      answer:
        "Rental periods vary by tool and owner. The available rental period will be listed on each tool's page.",
    },
    {
      question: 'What happens if I damage a rented tool?',
      answer:
        "You're responsible for returning the tool in the condition you received it. We recommend thoroughly inspecting tools before and after renting.",
    },
    {
      question: 'How do I list a tool for rent?',
      answer:
        'Go to your profile, click on Add Tool, and fill out the required information including photos, description, and rental price.',
    },
    {
      question: 'How much should I charge for my tool?',
      answer:
        "Consider factors like the tool's value, local rental rates, and how often you expect it to be rented. You can always adjust the price later.",
    },
    {
      question: 'Am I responsible for maintaining my listed tools?',
      answer:
        ' Yes, you should ensure your tools are in good working condition and match the description in your listing.',
    },
    {
      question: 'How do payments work?',
      answer:
        'We handle all payments through our secure platform. Renters pay when their rental request is approved, and owners receive payment after the rental period ends.',
    },
    {
      question: 'What fees does ToolR charge?',
      answer:
        'We charge a 80% service fee on each transaction to cover platform maintenance and customer support.',
    },
    {
      question: 'How does ToolR ensure user safety?',
      answer:
        'We verify user identities, provide a secure messaging system, and offer insurance options for renters and owners.',
    },
    {
      question: 'What should I do if a tool is not as described?',
      answer:
        "Contact the owner immediately through our messaging system. If you can't resolve the issue, contact our customer support.",
    },
    {
      question: 'Is my personal information safe?',
      answer:
        'We use industry-standard encryption and security measures to protect your data. We never share your personal information without your consent.',
    },
    {
      question: 'What are your customer support hours?',
      answer:
        'We are available for one hour, one day a week, on a random cycle. With no warning.',
    },
  ]
  return (
    <div className="help-container">
      <h1>Help & FAQ</h1>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Help
