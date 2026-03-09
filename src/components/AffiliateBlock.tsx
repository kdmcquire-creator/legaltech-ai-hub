import React from 'react';

interface AffiliateBlockProps {
  placement?: 'toolPage' | 'directory';
}

const AffiliateBlock: React.FC<AffiliateBlockProps> = ({ placement = 'toolPage' }) => {
  return (
    <div className={`bg-gray-50 border-t border-gray-200 py-12 ${placement === 'directory' ? 'mt-16' : 'mt-20'}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended for Legal Security</h3>
          <p className="text-gray-600 mb-8">
            Protect your sensitive legal data and maintain client confidentiality with professional security tools.
          </p>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <div className="font-bold text-lg text-blue-600 mb-1">NordProtect</div>
              <p className="text-sm text-gray-500">Comprehensive data protection and identity theft monitoring for legal professionals.</p>
            </div>
            <a 
              href="https://go.nordprotect.net/aff_c?offer_id=973&aff_id=142338" 
              target="_blank" 
              rel="nofollow noopener" 
              className="whitespace-nowrap bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Protect My Data
            </a>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            <p>
              Disclosure: We may earn a commission from partners listed on this page. 
              This helps us keep LegalTech AI Hub free for the community. 
              <a href="/disclosure" className="underline ml-1">Learn more about our disclosure policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBlock;
