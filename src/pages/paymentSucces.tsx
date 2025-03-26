import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 mx-auto">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Your subscription has been successfully renewed. Thank you for your continued trust.
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-8"></div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Return to Previous Page
                        </button>
                        
                        <button
                            onClick={handleGoHome}
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            <Home className="w-5 h-5" />
                            Go to Homepage
                        </button>
                    </div>

                    {/* Additional Info */}
                    <p className="mt-8 text-sm text-gray-500">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccess;