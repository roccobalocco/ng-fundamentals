import { VoterService } from "./voter.service";
import { ISession } from "./event.model";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

describe('VoterService Test', () => {
  let voterService: VoterService,
    mockHttp: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj<HttpClient>(
      'mockHttp', ['delete', 'post'])

    voterService = new VoterService(mockHttp)
  })

  describe('deleteVoter', () => {

    it('Should be removing the vore form the list of voters', () => {
      const session = { id: 6, voters: ['joe', 'john']}

      mockHttp.delete.and.returnValue(of(false))

      voterService.deleteVoter(3, <ISession> session, 'joe') //conversione forzata

      expect(session.voters.length).toBe(1)
      expect(session.voters[0]).toBe('john')
    })

    it('Should call http.delete with the right URL', () => {
      const session = { id: 6, voters: ['joe', 'john']}

      mockHttp.delete.and.returnValue(of(false))

      voterService.deleteVoter(3, <ISession> session, 'joe') //conversione forzata

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')
    })
  })

  describe('addVoter', () => {

    it('Should call http.post with the right URL', () => {
      const session = { id: 6, voters: ['john']}

      mockHttp.post.and.returnValue(of(false))

      voterService.addVoter(3, <ISession> session, 'joe') //conversione forzata

      expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object))
    })
  })
})
