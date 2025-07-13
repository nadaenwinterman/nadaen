import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Search,
  Building,
  MapPin,
  Users,
  Star,
  ArrowRight,
  Globe,
  Filter,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Mock companies data - In real app, this would come from API
  const mockCompanies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      logo: "TC",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "1000-5000",
      rating: 4.8,
      openJobs: 23,
      description:
        "Leading technology company focused on AI and machine learning solutions.",
      website: "https://techcorp.com",
      founded: 2010,
    },
    {
      id: 2,
      name: "InnovateCo",
      logo: "IC",
      industry: "Technology",
      location: "New York, NY",
      size: "500-1000",
      rating: 4.6,
      openJobs: 15,
      description:
        "Innovative software solutions for enterprise clients worldwide.",
      website: "https://innovateco.com",
      founded: 2015,
    },
    {
      id: 3,
      name: "DesignHub",
      logo: "DH",
      industry: "Design",
      location: "Los Angeles, CA",
      size: "100-500",
      rating: 4.9,
      openJobs: 8,
      description:
        "Creative agency specializing in digital design and user experience.",
      website: "https://designhub.com",
      founded: 2018,
    },
    {
      id: 4,
      name: "DataMinds",
      logo: "DM",
      industry: "Data & Analytics",
      location: "Seattle, WA",
      size: "200-500",
      rating: 4.7,
      openJobs: 12,
      description:
        "Data science and analytics company helping businesses make data-driven decisions.",
      website: "https://dataminds.com",
      founded: 2016,
    },
    {
      id: 5,
      name: "GreenTech Solutions",
      logo: "GT",
      industry: "CleanTech",
      location: "Austin, TX",
      size: "50-100",
      rating: 4.5,
      openJobs: 6,
      description: "Sustainable technology solutions for a greener future.",
      website: "https://greentech.com",
      founded: 2019,
    },
    {
      id: 6,
      name: "FinanceFlow",
      logo: "FF",
      industry: "Finance",
      location: "Chicago, IL",
      size: "500-1000",
      rating: 4.4,
      openJobs: 18,
      description:
        "Financial technology platform revolutionizing digital payments.",
      website: "https://financeflow.com",
      founded: 2014,
    },
  ];

  const industries = [
    "All",
    "Technology",
    "Design",
    "Data & Analytics",
    "CleanTech",
    "Finance",
  ];

  useEffect(() => {
    // Simulate API call
    const loadCompanies = async () => {
      setLoading(true);
      setTimeout(() => {
        setCompanies(mockCompanies);
        setFilteredCompanies(mockCompanies);
        setLoading(false);
      }, 1000);
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    let filtered = companies;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Industry filter
    if (industryFilter && industryFilter !== "All") {
      filtered = filtered.filter(
        (company) => company.industry === industryFilter
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((company) =>
        company.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, industryFilter, locationFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setIndustryFilter("");
    setLocationFilter("");
  };

  const CompanyCard = ({ company, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {company.logo}
                </span>
              </div>
              <div>
                <CardTitle className="text-lg">{company.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {company.industry}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{company.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {company.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{company.size} employees</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Founded {company.founded}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {company.openJobs} open positions
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate(`/jobs?company=${encodeURIComponent(company.name)}`)
              }
              className="flex items-center space-x-1"
            >
              <span>View Jobs</span>
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Companies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore top companies and find your next career opportunity
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search companies, industries, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  icon={MapPin}
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {industries.map((industry) => (
                    <option
                      key={industry}
                      value={industry === "All" ? "" : industry}
                    >
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              {loading
                ? "Loading companies..."
                : `${filteredCompanies.length} companies found`}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Sort by:
              </span>
              <select className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Company Name</option>
                <option>Rating: High to Low</option>
                <option>Open Jobs</option>
                <option>Company Size</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredCompanies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No companies found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or clearing some filters.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        {!loading && filteredCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Find Your Dream Job?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse thousands of job opportunities from these amazing
                companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/jobs")}
                  className="flex items-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse All Jobs</span>
                </Button>
                <Button variant="outline" onClick={() => navigate("/signup")}>
                  Create Profile
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Companies;
