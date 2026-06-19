 import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useRef,useState } from 'react'
import { generate3DView } from '../../lib/ai.action'
import { Box ,X} from 'lucide-react'
import Button from '../../components/ui/Button'

const visualizerId= () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {initialImage,initialRender,name}=location.state || {};

  const hasInitialGenerated = useRef(false);

  const [isProcessing, setIsProcessing]=useState(false);
  const [currentImage,setcurrentImage]=useState<string | null>(initialRender || null)

  const handleBack = ()=>navigate('/');

  const runGeneration = async()=>{
    if(!initialImage) return;

    try{
      setIsProcessing(true);

      const result = await generate3DView({sourceImage:initialImage});

      if(result.renderedImage){
        setcurrentImage(result.renderedImage);
      }
    }catch(error){
      console.error('Generation failed: ',error)
    }finally{
      setIsProcessing(false)
    }

  }


useEffect(()=>{
  if(!initialImage || hasInitialGenerated.current) return
  if(initialRender){
    setcurrentImage(initialRender);
    hasInitialGenerated.current=true;
    return
  }

  hasInitialGenerated.current=true;
  runGeneration()
},[initialImage,initialRender])

  return (
  
     
      <div className="visualizer">
       <nav className="topbar">
        <div className="brand">
          <Box className="logo"/>
          <span className="name">Archify</span>
        </div>
        <Button variant='ghost' size="sm" onClick={handleBack} className='exit'>
          <X className="icon"/>
          <Button/>
       </nav>

<section className="content">
  <div className="panel">
    <div className="panel-meta">
      <p>Project</p>
      <h2>{'Untitled Project'}</h2>
      <p className='note'>Created by You</p>
    </div>
    <div className="panel-actions">
      <Button size='sm' onClick={} className='export' disabled={!currentImage}></Button>

      D
    </div>
  </div>
</section>
        
      </div>
  
  )
}

export default visualizerId
