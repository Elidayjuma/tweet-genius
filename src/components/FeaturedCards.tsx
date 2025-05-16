import { FaTwitter, FaBolt, FaClipboardList } from 'react-icons/fa';

const FeatureCards = () => {
    const features = [
        {
            icon: <FaTwitter className="text-blue-500 text-xl" />,
            title: "High-Impact Tweets",
            description: "Generate sharp, engaging tweets tailored to your topic or niche in seconds."
        },
        {
            icon: <FaBolt className="text-yellow-500 text-xl" />,
            title: "Lightning Fast",
            description: "No need to brainstorm—TweetGenius delivers quality content instantly."
        },
        {
            icon: <FaClipboardList className="text-green-500 text-xl" />,
            title: "Consistent Output",
            description: "Stay active and consistent on social media with fresh tweets whenever you need them."
        },
    ];




    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-10">
            {features.map((feature, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        {feature.icon}
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 text-center">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

export default FeatureCards;
