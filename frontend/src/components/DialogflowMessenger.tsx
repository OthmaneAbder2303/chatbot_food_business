import { useEffect } from "react";

const DialogflowMessenger: React.FC = () => {
  useEffect(() => {
    // Load the Dialogflow messenger script dynamically
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="namoth-chatbot-food"
      agent-id="f90a7c05-37e5-4570-8ed4-e7f0bd26178b"
      language-code="en"
    />
  );
};

export default DialogflowMessenger;