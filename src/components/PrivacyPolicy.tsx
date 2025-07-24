import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/chapters');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 头部 */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="ml-4 text-xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* 内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="prose prose-gray max-w-none">
            
            <p className="text-gray-700 leading-relaxed mb-6">
              This Privacy Policy covers the services (including all services, software applications, and websites to which this Privacy Policy is posted, the "Services") operated by Meta Innovation Ltd. and its affiliates (collectively, "we", "us" and/or "our").
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This Privacy Policy explains what Personal Information (defined below) we collect, how we use and share that information, and your choices concerning our data practices. This Privacy Policy is incorporated into and is part of our Terms of Service.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Before using the Services or submitting any Personal Information to Character, please review this Privacy Policy carefully. By using the Services, you agree to the practices described in this Privacy Policy. If you do not agree to this Privacy Policy, you may not access any of our Websites or otherwise use the Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect information that alone or in combination with other information in our possession could be used to identify you ("Personal Information") as follows:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">a) Personal Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect Personal Information if you create an account or communicate with us as follows.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Communication Information:</strong> If you otherwise communicate with us, we may collect your name, contact information, and the contents of any messages you send ("Communication Information").
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">b) Personal Information We Collect Through Our Social Media Pages</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We have pages on social media sites like Instagram, Facebook, Medium, Twitter, YouTube and LinkedIn ("Social Media Pages"). When you interact with our Social Media Pages, we will collect Personal Information that you elect to provide to us, such as your contact details ("Social Information"). In addition, the companies that host our Social Media Pages may provide us with aggregate information and analytics regarding the use of our Social Media Pages, which may include information about your engagement with our social media sites.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">c) Personal Information We Receive Automatically From Your Use of the Service</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit, use, and interact with the Service, we may receive certain information about your visit, use, or interactions ("Technical Information"). For example, we may monitor the number of people that visit the Services, peak hours of visits, which page(s) are visited, the domains our visitors come from, and which browsers people use to access the Service (e.g., Chrome, Firefox, etc.), broad geographical information, and navigation pattern. In particular, technical information includes the following, which is created and automatically logged into our systems:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">d) Log data</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Information that your browser automatically sends whenever you visit the Site ("log data"). Log data includes your Internet Protocol address, browser type and settings, the date and time of your request, and how you interacted with the Site. Cookies. Please see the "Cookies" section below to learn more about how we use cookies. Device information. Includes name of the device, operating system, and browser you are using. Information collected may depend on the type of device you use and its settings. Usage Information. We collect information about how you use our Service, such as the types of content that you view or engage with, the features you use, the actions you take, and the time, frequency, and duration of your activities.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">e) Screenshots images</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our app requires access to screenshots of your game interface solely for providing puzzle solutions. All screenshot processing is performed locally on your device, and no images are ever transmitted to external servers or third parties. We do not maintain any permanent storage of your screenshots. You maintain full control over photo permissions and can revoke access through your device settings at any time. Your gameplay privacy is protected as all processing occurs locally on your device.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">f) Analytics</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may use a variety of online analytics products (such as Google Analytics, whose data use practices are explained at www.google.com/policies/privacy/partners/) that use cookies to help us analyze how users use the Site and enhance your experience when you use the Site.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">g) Online Tracking and Do Not Track Signals</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We and our third party service providers may use cookies or other tracking technologies to collect information about your browsing activities over time and across different websites following your use of the Site. Our Site currently does not respond to "Do Not Track" ("DNT") signals and operates as described in this Privacy Policy whether or not a DNT signal is received.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Your Choices:</strong> On most web browsers, you will find a "help" section on the toolbar. Please refer to this section for information on how to receive a notification when you are receiving a new cookie and how to turn cookies off.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Please note that if you limit the ability of websites to set cookies, you may be unable to access certain aspects of the Services and you may not be able to benefit from the Services' full functionality.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Advertising networks may use cookies to collect personal information. Most advertising networks offer you a way to opt out of targeted advertising.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Personal Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We may use Personal Information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-8 space-y-2">
              <li>To provide and administer access to the Services;</li>
              <li>To maintain, improve or repair any aspect of the Services, which may remain internal or may be shared with third parties if necessary;</li>
              <li>To inform you about features or aspects of the Services we believe might be of interest to you;</li>
              <li>To respond to your inquiries, comments, feedback, or questions;</li>
              <li>To send administrative information to you, for example, information regarding the Services or changes to our terms, conditions, and policies;</li>
              <li>To analyze how you interact with our Service;</li>
              <li>To develop new programs and services;</li>
              <li>To prevent fraud, criminal activity, or misuses of our Service, and to ensure the security of our IT systems, architecture, and networks; and</li>
              <li>To comply with legal obligations and legal process and to protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or other third parties.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Aggregated Information</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              We may aggregate Personal Information and use the aggregated information to analyze the effectiveness of our Services, to improve and add features to our Services, to conduct research (which may remain internal or may be shared with third parties as necessary) and for other similar purposes. In addition, from time to time, we may analyze the general behavior and characteristics of users of our Services and share aggregated information like general user statistics with third parties, publish such aggregated information or make such aggregated information generally available. We may collect aggregated information through the Service, through cookies, and through other means described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sharing and Disclosure of Personal Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In certain circumstances, we may share your Personal Information with third parties without further notice to you, unless required by law, as set forth below:
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Vendors and Service Providers:</h4>
                <p className="text-gray-700 leading-relaxed">
                  To assist us in meeting business operations needs and to perform certain services and functions, we may share Personal Information with vendors and service providers, including providers of hosting services, cloud services, and other information technology services providers, email communication software and email newsletter services, advertising and marketing services, and web analytics services.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Transfers:</h4>
                <p className="text-gray-700 leading-relaxed">
                  If we are involved in strategic transactions, reorganization, bankruptcy, receivership, or transition of service to another provider (collectively a "Transaction"), your Personal Information and other information may be shared in the diligence process with counterparties and others assisting with the Transaction and transferred to a successor or affiliate as part of that Transaction along with other assets.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Legal Requirements:</h4>
                <p className="text-gray-700 leading-relaxed">
                  If required to do so by law or in the good faith belief that such action is necessary to (i) comply with a legal obligation, including to meet national security or law enforcement requirements, (ii) protect and defend our rights or property, (iii) prevent fraud, (iv) act in urgent circumstances to protect the personal safety of a person or group, or (v) protect against legal liability.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              If you have any questions about our Privacy Policy or information practices, please feel free to contact us via{' '}
              <a href="mailto:hello@metainnovation.site" className="text-blue-600 hover:text-blue-800 underline">
                hello@metainnovation.site
              </a>
            </p>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 