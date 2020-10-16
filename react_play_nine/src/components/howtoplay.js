import React from 'react'

const HowToPlay = (props) => {

    return (
      <div className="row">
        <div className="col-12 rules">
            <h3>Rules</h3>
            <ol>
                <li>
                    Select a number or numbers to match the number of the stars. For example, if you see six stars you can select the number 6 or a combination of numbers that sum up to six (1 and 5 or 2 and 4). You select a number by clicking on it.
                </li>
                <li>
                    Slected numbers should appear on the right side of the equal sign. Once you select the number(s) click on the equal sign.
                </li>
                <li>
                    If selected number(s) are matching the number of the stars the equal button will turn green with a tick mark. You need to click it again to confirm your choice.
                </li>
                <li>
                    If selected number(s) do not match the number of the stars the qual button will turn red. You need to select the correct numbers. You can click on a selected number to unselect it.
                </li>
                <li>
                    New number combination of stars will appear and you need to select again a number(s) to match them.
                </li>
                <li>
                    You need to use all your numbers to win the game!
                </li>
                <li>
                    If you do not have a number(s) to match the number of the stars you can press 5 times on the yellow button to redraw (get new combination of the stars).
                </li>
                <li>
                    You have a time limit of 1 minute to win the game.
                </li>
                <li>
                    Have fun!
                </li>
            </ol>
        </div>
      </div>
    )
  }
  

export default HowToPlay