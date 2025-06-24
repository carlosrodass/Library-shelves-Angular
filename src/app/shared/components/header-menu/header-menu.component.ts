import { Component } from "@angular/core";
import { SharedModule } from "../../shared.module";

@Component({
    selector: 'header-menu',
    templateUrl: './header-menu.component.html',
    styleUrl: './header-menu.component.scss',
    standalone: true,
    imports: [SharedModule],
})


export class HeaderMenuComponent {

    constructor(){}

    ngOnInit(){
        
    }

}