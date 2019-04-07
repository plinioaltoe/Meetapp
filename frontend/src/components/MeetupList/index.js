import React from 'react'

// import { Container } from './styles';
import card from '../../assets/card.png'

import MeetupCard from './MeetupCard'

const MeetupList = () => (
  <div style={{ marginLeft: '300px' }}>
    <MeetupCard id={1} url={card} title="Meetup Reactive Native" numMembers="153" goToMeetupDetail={() => {}} />
  </div>
)

export default MeetupList
