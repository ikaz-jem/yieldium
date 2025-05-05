import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { Fragment } from 'react'
import { FaChevronDown } from "react-icons/fa6";
export default function FeaturesAccordion() {

  const data = [
    {
      title: 'What is your refund policy?',
      desc: 'Yes! You can purchase a license that you can share with your entire team.'
    },
    {
      title: 'What is your refund policy?',
      desc: 'Yes! You can purchase a license that you can share with your entire team.'
    },
    {
      title: 'What is your refund policy?',
      desc: 'Yes! You can purchase a license that you can share with your entire team.'
    },
    {
      title: 'What is your refund policy?',
      desc: 'Yes! You can purchase a license that you can share with your entire team.'
    },
    {
      title: 'What is your refund policy?',
      desc: 'Yes! You can purchase a license that you can share with your entire team.'
    },
  ]




  return (
    <>
      <div className="h-full w-full max-w-lg ">
        <div className="mx-auto w-full space-y-2">
          {
            data?.map((faq, idx) => <div key={idx} className='border-white/10 p-[1px]  rounded-lg'>
              <Disclosure as="div" className="p-5 bg-white/5  bg-clip-border rounded-lg" defaultOpen={idx==0 ?true:false}>
                {({ open }) => (
                  <>
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg">
                      <span className=" font-medium text-white group-data-hover:text-white/80">
                        {faq?.title}
                      </span>
                      <div className='border border-primary/50 p-2 rounded'>

                      <FaChevronDown className="size-5 fill-primary/60 group-data-hover:fill-accent/50 group-data-open:rotate-180" />
                      </div>
                    </DisclosureButton>
                    <div className="overflow-hidden ">
                      <AnimatePresence>
                        {open && (
                          <DisclosurePanel static as={Fragment}>
                            <motion.div
                              initial={{ opacity: 0, y: -24 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -24 }}
                              transition={{ duration: 0.2, ease: easeOut }}
                              className="origin-top mt-2 text-sm/5 text-white/50 max-w-sm"
                            >
                              {faq?.desc}
                            </motion.div>
                          </DisclosurePanel>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </Disclosure>
            </div>)
          }
        </div>
      </div>
    </>
  )

}