export const OAuthButton = ({ provider, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:text-gray-900" />
      <span className="font-medium text-gray-700">Continue with {provider}</span>
    </button>
  );
};