import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ()=>{

	return (
        <div className="c-section bg-gray-300" >
          <h2 className="text-gray-700 font-semibold m-0 loading" >Now Loading...</h2>
          <div className="square-parallel-center " >
            <CircularProgress size={80} />
          </div>
        </div>
)
}

export default Loader