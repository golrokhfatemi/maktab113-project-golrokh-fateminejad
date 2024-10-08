import { Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default function FinalizeCartPage() {
    const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="flex justify-center items-start flex-col h-screen mx-20 gap-5">
        <p className='font-semibold text-3xl '>Finalize your cart</p>
        <form className="flex flex-col justify-start gap-5  bg-sky-950 text-white p-10  w-full rounded-3xl h-2/3">

          <Stack spacing={5}>
            <Input placeholder="First name : " size="lg" variant="flushed" />
            <Input placeholder="Last name : " size="lg" variant="flushed" />
            <Input placeholder="Address : " size="lg" variant="flushed" />
            <Input placeholder="Mobile number : " size="lg" variant="flushed" />
            {/* <Input placeholder="Delivery data : " size="lg" type="date" variant="flushed"  /> */}
            <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select delivery date"
            className="p-2 rounded-md bg-white text-black w-full" // کلاس های سفارشی برای استایل
          />
            
          </Stack>
         
          <Button colorScheme="teal" size="md" className='p-6'>
          
            Payment
          </Button>
        </form>
      </div>
  )
}
