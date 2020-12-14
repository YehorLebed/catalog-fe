import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../../interfaces/user.interface';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public user: IUser = null;
    public showMenu = false;
    private subscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    /**
     * subscribe for token changing
     * @return {void}
     */
    ngOnInit(): void {
        this.subscription = this.authService.subscribeOnTokenChange(token => {
            this.user = this.authService.getUser();
        });
    }

    /**
     * unsubscribes
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * toggle menu
     * @return {void}
     */
    public toggleMenu(): void {
        this.showMenu = !this.showMenu;
    }

    /**
     * logout and clear token data
     * @return {void}
     */
    public logout(): void {
        this.authService.logout();
    }

    /**
     * check if user is logged in
     * @return {boolean}
     */
    public isLoggedIn(): boolean {
        return !!this.user;
    }

    /**
     * define if user is customer
     */
    public isCustomer(): boolean {
        return this.authService.isRole('customer');
    }

    /**
     * define if user is admin
     */
    public isAdmin(): boolean {
        return this.authService.isRole('admin');
    }
}
