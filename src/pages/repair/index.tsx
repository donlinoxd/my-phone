import {
    MdMiscellaneousServices,
    MdOutlineEngineering,
    MdOutlineMobileFriendly,
    MdOutlineSchedule,
    MdOutlineSend,
    MdOutlineSendToMobile,
} from 'react-icons/md'

// local modules
import ReachForm from '@/components/ReachForm'
import RepairIssues from '@/components/RepairIssues'
import RepairSchedule from '@/components/RepairSchedule'
import SelectBrand from '@/components/SelectBrand'
import SelectModel from '@/components/SelectModel'
import ServiceType from '@/components/ServiceType'
import Stepper from '@/components/Stepper'
import { nextStep, setStep } from '@/rtk/features/repairSlice'
import { useAppSelector } from '@/rtk/hook'

const Repair = () => {
    const { step, completedStep, payload } = useAppSelector((state) => state.repair)

    const steps = [
        {
            label: 'Select Brand',
            errorMsg: 'Select device',
            icon: <MdOutlineMobileFriendly />,
            content: <SelectBrand title='Repair Your Device' nextStep={nextStep} />,
        },
        {
            label: 'Select Model',
            errorMsg: 'Select model',
            icon: <MdOutlineSendToMobile />,
            content: <SelectModel brand={payload.brand!} nextStep={nextStep} />,
        },
        { label: 'Device Issues', errorMsg: 'select issue', icon: <MdOutlineEngineering />, content: <RepairIssues /> },
        { label: 'Service Type', errorMsg: 'Pick service type', icon: <MdMiscellaneousServices />, content: <ServiceType /> },
        { label: 'Schedule Your Time', errorMsg: 'Pick schedule', icon: <MdOutlineSchedule />, content: <RepairSchedule /> },
        { label: 'How To Reach You', errorMsg: 'thank you', icon: <MdOutlineSend />, content: <ReachForm /> },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

export default Repair
