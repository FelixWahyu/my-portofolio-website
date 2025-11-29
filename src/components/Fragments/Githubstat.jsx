function GitHubStats() {
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-500">GitHub Statistics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300">
          <img src="https://streak-stats.demolab.com?user=FelixWahyu&locale=en&mode=daily&theme=tokyonight&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph" />
        </div>
        <div className="rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300">
          <img src="https://readme-stats.warengonzaga.com/api?username=FelixWahyu&theme=nightowl&hide_border=false&cache_seconds=7200" alt="stats graph" height="250" />
        </div>
        <div className="mx-auto lg:col-span-2 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300">
          <img src="https://readme-stats.warengonzaga.com/api/top-langs/?username=FelixWahyu&layout=compact&theme=blue-green&hide_border=false&cache_seconds=7200" alt="languages graph" height="150" />
        </div>
      </div>
    </div>
  );
}

export default GitHubStats;
