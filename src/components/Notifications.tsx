import { motion, AnimatePresence } from "framer-motion";
import { InfoFilled, WarningFilled, CheckCircleFilled, NotAllowed, CloseIconCircle, UserFilled, NoSignal, UserForbiddenFilled } from "../components/IconPacks";

interface modalProps {
  type: string
  showModal: boolean;
  message:string
  onAccept?: () => void;
  onDecline?: () => void;
  onAcceptText?: string
  onDeclineText?: string
}

interface alertProps {
  type:string;
  message:string
  displayAlert:boolean
  onClick: () => void
}


const Modal = ({showModal, onAccept, onDecline, type, message, onAcceptText, onDeclineText}:modalProps) => {

  const setIcon = (alertType:string) => {
    if (alertType === 'error') {
      return <NotAllowed className="text-red-400 lg:w-12 lg:h-12 w-7 h-7"/>
    } else if (alertType === 'warning') {
      return <WarningFilled className="text-amber-400 lg:w-12 lg:h-12 w-7 h-7"/>
    } else if (alertType === 'success') {
      return <CheckCircleFilled className="text-green-400 lg:w-12 lg:h-12 w-7 h-7"/>
    } else if (alertType === 'user') {
      return <UserFilled className="text-red-400 lg:w-12 lg:h-12 w-7 h-7"/>
    } else {
      return <InfoFilled className="text-blue-400 lg:w-12 lg:h-12 w-7 h-7"/>
    }
  }

  const setCloseIconColor = (alertType:string) => {
    const alertButton = { error: 'bg-red-500', warning: 'bg-amber-500', success: 'bg-green-500', info: 'bg-blue-500'}
    if (alertType === 'error') {
      return alertButton.error
    } else if (alertType === 'warning') {
      return alertButton.warning
    } else if (alertType === 'success') {
      return alertButton.success
    } else if (alertType === 'network') {
      return alertButton.error
    } else if (alertType === 'user') {
      return alertButton.error
    } else {
      return alertButton.info
    }
  }

  return (
    <AnimatePresence>
      { showModal &&
        <motion.div 
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 dark:bg-white/20 z-[100000]"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <motion.div 
            className="bg-white dark:bg-[#3a3a3a] lg:w-[40%] md:w-[50%] w-[85%] min-h-[50px] rounded-lg p-3 flex flex-col justify-between"
            initial={{y: '-50%', opacity: 0}}
            animate={{y: '0%', opacity: 1}}
            exit={{y: '-50%', opacity: 0}}
          >
            <div className="lg:-mt-8 lg:-ml-8 -mt-6 -ml-6">
              <span className="bg-white inline-block p-1 rounded-full">{setIcon(type)}</span>
            </div>
            <p className="lg:text-[15px] text-[13px] leading-normal w-[96%] mx-auto mb-2">{message}</p>
            <div className="flex justify-end gap-4">
              { onAccept && <button onClick={onAccept} className={`py-1 px-4 rounded text-white ${setCloseIconColor(type)} lg:text-sm text-xs uppercase`}>{onAcceptText}</button>}
              { onDecline && <button onClick={onDecline} className="py-1 px-4 rounded text-white bg-red-500 lg:text-sm text-xs uppercase">{onDeclineText}</button>}
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  );
}

const Alert = ({type, message, onClick, displayAlert}:alertProps) => {

  const setIcon = (alertType:string) => {
    if (alertType === 'error') {
      return <NotAllowed className="text-red-400 lg:w-7 lg:h-7 w-5 h-5"/>
    } else if (alertType === 'warning') {
      return <WarningFilled className="text-amber-400 lg:w-7 lg:h-7 w-5 h-5"/>
    } else if (alertType === 'success') {
      return <CheckCircleFilled className="text-green-400 lg:w-7 lg:h-7 w-5 h-5"/>
    } else if (alertType === 'network') {
      return <NoSignal className="text-red-400 lg:w-7 lg:h-7 w-5 h-5"/>
    } else if (alertType === 'user') {
      return <UserForbiddenFilled className="text-red-400 lg:w-7 lg:h-7 w-5 h-5"/>
    } else {
      return <InfoFilled className="text-blue-400 lg:w-7 lg:h-7 w-5 h-5"/>
    }
  }
  
  const setCloseIconColor = (alertType:string) => {
    const alertButton = { error: 'text-red-400', warning: 'text-amber-400', success: 'text-green-400', info: 'text-blue-400'}
    if (alertType === 'error') {
      return alertButton.error
    } else if (alertType === 'warning') {
      return alertButton.warning
    } else if (alertType === 'success') {
      return alertButton.success
    } else if (alertType === 'network') {
      return alertButton.error
    } else if (alertType === 'user') {
      return alertButton.error
    } else {
      return alertButton.info
    }
  }

  const setBackground = (alertType:string) => {
    const alertBackgrounds = { error: 'bg-red-200 border-red-200 border', warning: 'bg-amber-200 border border-amber-200', success: 'bg-green-200 border border-green-200', info: 'bg-blue-200 border border-blue-200'}
    if (alertType === 'error') {
      return alertBackgrounds.error
    } else if (alertType === 'warning') {
      return alertBackgrounds.warning
    } else if (alertType === 'success') {
      return alertBackgrounds.success
    } else if (alertType === 'network') {
      return alertBackgrounds.error
    }  else if (alertType === 'user') {
      return alertBackgrounds.error
    } else {
      return alertBackgrounds.info
    }
  }

  return (
    <AnimatePresence>
      { displayAlert && 
        <motion.div 
          className="fixed top-0 left-0 w-full lg:p-[5%] md:pt-[35%] md:px-[10%] pt-[25%] pb-[75%] justify-center h-full flex md:justify-end bg-black/20 dark:bg-white/20 z-[100000]"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <motion.div
            initial={{x: '50%', opacity: 0}}
            animate={{x: '0%', opacity: 1}}
            exit={{x: '50%', opacity: 0}}
            className="mb-3"
          >
            <div className={`rounded-md p-[6px] flex flex-col ${setBackground(type)} lg:max-w-[500px] lg:min-w-[350px] min-w-[300px] max-w-[400px]`}>
              <div className="flex gap-2 justify-between items-center w-full">
                <span>{setIcon(type)}</span>
                <h2 className="lg:text-[13px] text-[12px] leading-normal text-black">{message}</h2>
                <span className="cursor-pointer lg:-mt-6 lg:-mr-6 -mt-5 -mr-5" onClick={onClick}>
                  <CloseIconCircle className={`lg:w-10 lg:h-10 w-8 h-8 ${setCloseIconColor(type)}`}/>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export { Modal, Alert };