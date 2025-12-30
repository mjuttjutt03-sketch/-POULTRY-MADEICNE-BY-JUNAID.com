
import React, { useState, useEffect } from 'react';
import { getPoultryNews } from '../services/geminiService';

const ResourceView: React.FC = () => {
  const [data, setData] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getPoultryNews();
        setData(news);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base & News</h2>
        <p className="text-slate-600">The latest in poultry medicine, science, and global health trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="space-y-6">
              <div className="h-64 bg-slate-200 animate-pulse rounded-2xl"></div>
              <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 animate-pulse rounded w-1/2"></div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm prose prose-slate max-w-none">
              <h3 className="text-2xl font-bold mb-6">Global Poultry Health Report (2024-2025)</h3>
              <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
                {data?.text}
              </div>
              
              {data?.sources && data.sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Referenced Sources</h4>
                  <div className="space-y-3">
                    {data.sources.map((source: any, i: number) => (
                      <a 
                        key={i} 
                        href={source.web?.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all text-sm group"
                      >
                        <i className="fa-solid fa-link text-slate-400 group-hover:text-blue-600"></i>
                        <span className="font-medium underline underline-offset-4">{source.web?.title || 'External Report'}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
            <h3 className="text-xl font-bold mb-4">Quick Fact</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 italic">
              "Did you know that Newcastle Disease can be prevented with a rigorous vaccination schedule? Always consult local outbreak maps."
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              View Vaccination Map
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Popular Articles</h3>
            <ul className="space-y-6">
              {[
                { title: 'Biosecurity Protocols for Small Farms', views: '2.5k' },
                { title: 'Managing Heat Stress in Broilers', views: '1.8k' },
                { title: 'The Future of Non-Antibiotic Growth Promoters', views: '3.1k' },
                { title: 'Common Egg Quality Issues & Solutions', views: '900' },
              ].map((article, i) => (
                <li key={i} className="group cursor-pointer">
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">{article.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span><i className="fa-solid fa-eye mr-1"></i> {article.views} views</span>
                    <span><i className="fa-solid fa-clock mr-1"></i> 5 min read</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceView;
