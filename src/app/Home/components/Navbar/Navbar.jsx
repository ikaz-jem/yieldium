    
    import { useState } from "react";
    import { GiHamburgerMenu } from "react-icons/gi";
    import { motion, AnimatePresence } from 'framer-motion';
    import { IoCloseSharp } from "react-icons/io5";
    import ButtonPrimary from "@/app/components/ButtonPrimary";
    function NavbaMobile() {
        const [isOpen, setIsOpen] = useState(false);

        const sidebarVariants = {
          hidden: { x: '100%' },
          visible: { x: 0 },
          exit: { x: '100%' },
        };
      
        return (
            <div className="w-full  flex sm:hidden justify-between py-5 px-5  ">
                 <div className="flex items-center gap-2 ">
            <img src="/assets/images/logo.png" alt="" className="rounded-full h-10 w-10" />
            <p className="font-bold !text-title tracking-wide text-xl">Yieldium</p>
        </div>
          <div className="relative z-50">
          

            
            <GiHamburgerMenu  onClick={() => setIsOpen(true)} className="text-3xl text-white" />
      
            <AnimatePresence>
              {isOpen && (
                  <>
                  {/* Backdrop */}
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                  />
      
                  {/* Sidebar */}
                  <motion.div
                    className="fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-white/5 backdrop-blur-lg shadow-lg p-6 z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={sidebarVariants}
                    transition={{ type: 'tween' }}
                  >
                    
                  <IoCloseSharp  onClick={() => setIsOpen(false)} className="text-3xl text-white" />
                  
                    <div className="flex flex-col justify-between   ">

                    <ul className="flex flex-col gap-5">
            <li className="cursor-pointer hover:text-primary">Home</li>
            <li className="cursor-pointer hover:text-primary">About</li>
            <li className="cursor-pointer hover:text-primary">Features</li>
            <li className="cursor-pointer hover:text-primary">FAQ</li>
        </ul>
        <ButtonPrimary>Log In</ButtonPrimary>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          </div>
        );
      };


    
    export default function Navbar() {


        return (
        
            <div className="  absolute top-0  w-[calc(100vw-15px)] backdrop-blur-lg  ">
        
        <div className="  container mx-auto  ">
        <div className="  flex w-full items-center justify-between py-5 px-5 ">
            <div className="flex items-center gap-2 ">
                <img src="/assets/images/logo.png" alt="" className="rounded-full h-10 w-10" />
                <h5 className="font-bold  tracking-wide text-xl hidden sm:flex">Yieldium</h5>
            </div>

            <ul className="flex gap-5">
                <li className="cursor-pointer hover:text-primary">About</li>
                <li className="cursor-pointer hover:text-primary">Features</li>
                <li className="cursor-pointer hover:text-primary">FAQ</li>
            </ul>
            <ButtonPrimary>Log In</ButtonPrimary>

        </div>
        </div>
        </div>
        )

    }