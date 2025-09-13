import { describe, it, expect } from "vitest";
import { WordCountMultiple } from "../../checks/WordCountMultiple.js";

describe("WordCountMultiple", () => {
    const check = new WordCountMultiple();

    it(`succeeds when expected`, () => {
        const input = { value: 'This sentence is five words.' };
        const paragraphs = [];
        const output = check.getMessage(input, paragraphs);

        expect(output.style).toBe('error');
    });

    it(`fails when expected`, () => {
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque sed ligula sit amet mollis. Duis suscipit efficitur elementum. Sed tincidunt efficitur dolor vitae mollis. In a eros ut lectus lobortis pretium. Suspendisse magna lacus, varius vel dui a, elementum dignissim leo. Mauris elementum ex at urna tristique, non ultrices est feugiat. Cras egestas, magna eu condimentum posuere, mauris nisl porttitor sem, dignissim viverra ex nisl eget tellus. Mauris non ornare erat.\n' +
            '\n\nAliquam porta blandit odio ac commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed molestie risus id tortor pellentesque laoreet. Donec mollis lacus in dolor vulputate, eleifend commodo felis interdum. Aliquam erat volutpat. Duis consectetur nunc enim, ac convallis nibh dictum id. Vestibulum nec nisi in nisl dapibus ornare. Vestibulum tincidunt sodales volutpat. Nam convallis iaculis dui efficitur ornare. Donec sagittis, massa non bibendum porttitor, orci est ultrices metus, vitae ultrices metus mauris a elit. Aliquam interdum sapien nec mauris consequat, vitae ornare diam tristique. Phasellus aliquet urna vel turpis sollicitudin, ut dapibus justo porta. In non rutrum magna.' +
            '\n\nDuis at tellus quis tortor vestibulum hendrerit. Nullam in ornare felis. Nullam semper volutpat mattis. Mauris vel consequat nibh. Duis id justo dapibus nunc pellentesque facilisis vitae eget ligula. Nunc diam felis, vehicula eu risus quis, sodales luctus massa. Vivamus mi risus, luctus id mollis et, elementum vulputate mi. Integer eget malesuada felis, id maximus odio. Maecenas sem leo, eleifend nec leo eget, pulvinar condimentum est.' +
            '\n\nCras vehicula lectus eros, sed suscipit purus auctor in. Etiam feugiat scelerisque aliquam. Maecenas tempor tristique ligula. Praesent in ex in lectus pellentesque posuere nec placerat risus. Quisque dictum nec metus ac tempus. Maecenas facilisis metus at felis placerat, vestibulum rutrum sem molestie. Etiam cursus scelerisque lacinia.' +
            '\n\nNulla finibus ex in diam consequat lacinia. Quisque urna nisi, convallis in nunc non, aliquam tincidunt arcu. Nulla urna ante, dictum id pharetra ut, suscipit eu lacus. Pellentesque id suscipit turpis. Sed orci mauris, convallis vitae consequat non, maximus vehicula lacus. Donec rhoncus dolor auctor, pulvinar magna quis, sagittis arcu. Praesent fringilla bibendum mauris, ut volutpat leo dignissim a. Donec fermentum, tellus vitae imperdiet rutrum, eros purus consectetur velit, eu commodo massa est a augue. Sed ac rhoncus diam. Sed maximus sit amet ex eu feugiat. Quisque erat enim, gravida vitae fringilla nec, rutrum non dolor.' +
            '\n\nAliquam sem leo, varius efficitur nibh nec, sagittis rhoncus lacus. Nulla mattis mauris at ex tincidunt consequat. Aliquam rhoncus ante id justo malesuada ullamcorper id a diam. Sed pellentesque nibh magna, vitae ullamcorper felis tincidunt nec. In massa ligula, fringilla tempus tempor ac, gravida eget tortor. Etiam sit amet nulla nisi. Quisque enim ligula, fringilla sit amet lorem at, suscipit fermentum purus. Nullam vitae eros vel dui efficitur tempus nec sit amet lectus. Nullam ultrices varius sapien. Sed ullamcorper fringilla erat, non convallis massa pretium non.' +
            '\n\nNam purus orci, elementum vel nulla tincidunt, commodo luctus eros. Mauris pellentesque elit sagittis justo tristique, vel maximus purus facilisis. Sed aliquet diam sed libero vulputate rhoncus. Proin vel. '
        const input = { value: text };
        const paragraphs = [];
        const output = check.getMessage(input, paragraphs);

        expect(output.style).toBe('success');
    });
});
