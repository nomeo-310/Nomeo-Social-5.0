import React from 'react'
import { ArrowLeft, ArrowRight } from './IconPacks';

type paginationProps = {
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
type paginationButtonProps = {
  onClick: () => void
  disabled: boolean
  nextOrPrevious: boolean
  next?: boolean
  displayText?: any
  currentPage?: boolean
  icon?: React.ReactNode
}

const Pagination = ({currentPage, totalPages, setCurrentPage}:paginationProps) => {

  const handlePageChange = (page:number) => {
    setCurrentPage(page)
  }

  const PaginationButton = ({onClick, disabled, nextOrPrevious, displayText, icon, next, currentPage}:paginationButtonProps ) => {

    return(
      <button disabled={disabled} onClick={onClick} className={`rounded ${nextOrPrevious ? 'py-1 px-2 text-white bg-tertiaryBlue flex items-center gap-2' : 'lg:w-7 lg:h-7 w-5 h-5 flex items-center justify-center'} ${next ? 'flex-row-reverse' : ''} ${!nextOrPrevious && currentPage ? 'bg-tertiaryBlue text-white' : ''} lg:text-[13px] text-[12px] leading-normal`}>
        {icon}
        {displayText}
      </button>
    )
  }

  const renderPagination = () => {
    const pagesToShow = 5;
    const ellipsesThreshold = 3;
    const paginationItems:any[] = [];

    for (let index = 1; index <= totalPages; index++) {
      if ((index <= pagesToShow && index <= pagesToShow + ellipsesThreshold) || (index > totalPages - 3 && totalPages > 10) || Math.abs(index - currentPage)) {
        paginationItems.push(
          <PaginationButton
            key={index}
            onClick={() => handlePageChange(index)}
            nextOrPrevious={false}
            displayText={index}
            currentPage={currentPage === index} 
            disabled={currentPage === index}          
          />
        )
      } else if (paginationItems[paginationItems.length - 1] !== '...') {
        paginationItems.push(<span key={'ellipsis'}>...</span>)
      }
    }
    return paginationItems
  }

  const NextButton = () => {
    return (
      <PaginationButton 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        nextOrPrevious={true} 
        next={true}
        displayText={''}
        icon={<ArrowRight className='w-5 h-5 lg:w-6 lg:h-6'/>}   
      />
    )
  }

  const PreviousButton = () => {
    return (
      <PaginationButton 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        nextOrPrevious={true}
        next={false}
        displayText={''}  
        icon={<ArrowLeft className='w-5 h-5 lg:w-6 lg:h-6'/>}     
      />
    )
  }

  
  return (
    <div className="flex justify-center items-center gap-3">
      <>
        <PreviousButton/> {renderPagination()} <NextButton/>
      </>
    </div>
  )
}



export default Pagination