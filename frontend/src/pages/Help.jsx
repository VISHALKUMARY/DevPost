import React from "react";
import {
  HelpCircle,
  FileText,
  User,
  Moon,
  LogOut,
  MessageCircleQuestion,
} from "lucide-react";

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 sm:px-6 py-12 mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          <HelpCircle size={30} className="text-purple-700" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-800">
            Help & Support
          </h1>
        </div>

        {/* Help Cards */}
        <div className="grid gap-6 sm:gap-8">
          <HelpCard
            icon={<FileText size={20} className="text-purple-600" />}
            title="How do I create a post?"
            color="border-purple-600"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Log into your account.</li>
                <li>Click the <strong>Create Post</strong> button from the navbar.</li>
                <li>Fill in the <em>title</em> and <em>content</em>.</li>
                <li>Click <strong>Publish</strong>. Your post will appear in the global feed and under "My Posts".</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<User size={20} className="text-indigo-600" />}
            title="How do I update my profile?"
            color="border-indigo-600"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Click your profile avatar in the navbar (top-right).</li>
                <li>Select <strong>Profile</strong> from the dropdown.</li>
                <li>Edit your name, email, or profile picture.</li>
                <li>Changes will be saved automatically or via an update button.</li>
              </ul>
            )}
          />

          {/* <HelpCard
            icon={<Moon size={20} className="text-yellow-500" />}
            title="How do I switch between light and dark mode?"
            color="border-yellow-500"
            content={(
              <p className="text-gray-700 text-sm sm:text-base">
                Open the user dropdown menu and click the{" "}
                <strong>Dark Mode / Light Mode</strong> toggle. Your preference will be saved in your browser for future visits.
              </p>
            )}
          /> */}

          <HelpCard
            icon={<LogOut size={20} className="text-red-500" />}
            title="How do I log out?"
            color="border-red-500"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Click your profile avatar in the navbar.</li>
                <li>Select <strong>Log Out</strong> from the dropdown menu.</li>
                <li>You’ll be securely signed out and redirected to the login page.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<FileText size={20} className="text-rose-500" />}
            title="How do I delete a post?"
            color="border-rose-500"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Go to the <strong>My Posts</strong> section.</li>
                <li>Locate the post you want to delete.</li>
                <li>Click the <strong>Trash</strong> icon to remove it permanently.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<User size={20} className="text-blue-500" />}
            title="How can I follow other users?"
            color="border-blue-500"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Visit the profile of the user you wish to follow.</li>
                <li>Click the <strong>Follow</strong> button at the top of their profile.</li>
                <li>Their posts will now be easier to access from your feed.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<FileText size={20} className="text-green-600" />}
            title="How do I like or dislike a post?"
            color="border-green-600"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Under any post, you'll find <strong>like</strong> and <strong>dislike</strong> icons.</li>
                <li>Click one to react. You can change your reaction anytime.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<FileText size={20} className="text-cyan-600" />}
            title="Can I edit an existing post?"
            color="border-cyan-600"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>Yes! Go to <strong>My Posts</strong> and click the <strong>Edit</strong> icon (✏️).</li>
                <li>Make the necessary changes and save your post.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<MessageCircleQuestion size={20} className="text-gray-600" />}
            title="How do I reset my password?"
            color="border-gray-600"
            content={(
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700 text-sm sm:text-base">
                <li>On the login page, click <strong>Forgot Password?</strong></li>
                <li>Enter your registered email address.</li>
                <li>Follow the instructions sent to your inbox.</li>
              </ul>
            )}
          />

          <HelpCard
            icon={<MessageCircleQuestion size={20} className="text-gray-700" />}
            title="Still need help?"
            color="border-gray-700"
            content={(
              <p className="text-gray-700 text-sm sm:text-base">
                If you're facing any issues, have feature suggestions, or want to report a bug,
                feel free to contact us at{" "}
                <a
                  href="mailto:support@devpost.com"
                  className="text-purple-600 underline font-medium"
                >
                  support@devpost.com
                </a>
                . We typically respond within 24–48 hours.
              </p>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const HelpCard = ({ icon, title, content, color }) => (
  <div className={`bg-white p-4 sm:p-6 rounded-xl shadow border-l-4 ${color} hover:shadow-lg transition`}>
    <div className="flex items-start sm:items-center gap-3 mb-2">
      {icon}
      <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
    </div>
    {content}
  </div>
);

export default Help;
