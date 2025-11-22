import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReviews } from '../services/mockData';
import { Review } from '../types';
import { Star, ChevronRight, Award, Truck, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = getReviews();
    const validated = allReviews.filter(r => r.isValid).slice(0, 3);
    setReviews(validated);
  }, []);

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/431/1920/1080" 
            alt="Traiteur buffet" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            L'Art de Recevoir <br />
            <span className="text-amber-500">Sans Cuisiner</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Depuis 25 ans à Bordeaux, nous sublimons vos événements.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/menus" 
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-transform hover:scale-105"
            >
              Découvrir nos menus
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <Award className="w-8 h-8 mx-auto mb-6 text-amber-600" />
              <h3 className="text-xl font-bold mb-3">Savoir-faire</h3>
              <p className="text-gray-600">Experts culinaires pour des saveurs authentiques.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <Truck className="w-8 h-8 mx-auto mb-6 text-amber-600" />
              <h3 className="text-xl font-bold mb-3">Livraison Soignée</h3>
              <p className="text-gray-600">Nous livrons à Bordeaux et ses environs.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 mx-auto mb-6 text-amber-600" />
              <h3 className="text-xl font-bold mb-3">Flexibilité</h3>
              <p className="text-gray-600">Adaptables à vos imprévus.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Avis Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
                <div className="text-sm font-semibold text-slate-900">- {review.userName}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
