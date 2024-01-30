import React from 'react'
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Button } from 'antd';
export default function TestIssue() {
  const screens = useBreakpoint();

  
  return (
    <div>
      <Button
        style={{
          backgroundColor: screens.sm ? "red":"white"  //// ! for without small device
        }}
      >Open </Button>
      {
        screens.md && 
        <button>
          mideum device
        </button>
      }
      {
        screens.md && 
        <button>
          Large device
        </button>
      }
    </div>
  )
}
