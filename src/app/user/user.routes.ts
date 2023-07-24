import { UserResolver } from "../events/shared/user-resolver.service";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";

export const userRoutes = [
  { path: 'profile', component: ProfileComponent, resolve: { profile: UserResolver } },
  { path: 'login', component: LoginComponent }
]
