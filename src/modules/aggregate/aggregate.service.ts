import { Injectable } from '@nestjs/common'

import { UserService } from '../user/user.service'

@Injectable()
export class AggregateService {
  constructor(private readonly userService: UserService) {}
  async aggregate() {
    const user = await this.userService.getMasterInfo()
    // const aggregateData = await Promise.allSettled([
    //   this.userService.getMasterInfo(),
    // ])
    // const [user] = aggregateData.map((data) => {
    //   if (data.status === 'rejected') {
    //     return null
    //   }
    //   return data.value
    // })

    return {
      user,
    }
  }
}
