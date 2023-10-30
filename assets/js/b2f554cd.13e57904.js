"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[477],{10:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"vit-zero-shot-tasks-1","metadata":{"permalink":"/blog/vit-zero-shot-tasks-1","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2023-10-22-vit-zero-shot-tasks/index.md","source":"@site/blog/2023-10-22-vit-zero-shot-tasks/index.md","title":"ViT zero-shot image classification","description":"Preview","date":"2023-10-22T00:00:00.000Z","formattedDate":"October 22, 2023","tags":[{"label":"HCI challenge","permalink":"/blog/tags/hci-challenge"}],"readingTime":6.43,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"vit-zero-shot-tasks-1","title":"ViT zero-shot image classification","authors":["QIN2DIM"],"tags":["HCI challenge"],"keywords":["hcaptcha","captcha","YOLOv8","ResNet","object detection","image segmentation","bounding box","clip","vit","huggingface","llm","OpenAgents","automatic image annotation","CaptchaAgent","GPT","ONNX","hcaptca-challenger"]},"nextItem":{"title":"Draw a tight bounding box around the X","permalink":"/blog/draw-a-tight-bounding-box-around-the-x"}},"content":"## Preview\\n\\n> [CLIP](https://arxiv.org/abs/2103.00020) is a multi-modal vision and language model. It can be used for image-text similarity and for zero-shot image classification. CLIP uses a ViT like transformer to get visual features and a causal language model to get the text features. Both the text and visual features are then projected to a latent space with identical dimension. The dot product between the projected image and text features is then used as a similar score.\\n>\\n> [-- huggingface.co](https://huggingface.co/docs/transformers/model_doc/clip)\\n\\n![CLIP](https://r2-datalake.echosec.top/blog-obs/2023/10/3958bc6e52d9c3fc1fdabaf17657db76.png)\\n\\n## Milestone\\n\\n:::info\\n\\nWe merged a  [feature #858](https://github.com/QIN2DIM/hcaptcha-challenger/issues/858) to the main branch of [hcaptcha-challenger](https://github.com/QIN2DIM/hcaptcha-challenger) on October 22, 2023 to handle CAPTCHA via the CLIP image-text cross-modal model.\\n\\n:::\\n\\nPreviously, we trained and used the [ResNet model](https://github.com/CaptchaAgent/hcaptcha-model-factory/blob/main/src/factories/resnet.py#L28) to handle the image classification challenge. The model network parameters are so small that our [exported](https://pytorch.org/tutorials/beginner/onnx/export_simple_model_to_onnx_tutorial.html) ResNet [ONNX model](https://onnxruntime.ai/) is only 294KB and we can still get over 80% correct in the binary classification task. This is more than enough for a CAPTCHA challenge with only nine images.  \\n\\n> But today, in 2023, there are so many key breakthroughs in [Computer Vision](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiahvedm56CAxXEI0QIHQeMBLkQFnoECBkQAQ&url=https%3A%2F%2Fwww.ibm.com%2Ftopics%2Fcomputer-vision&usg=AOvVaw3K4rO-yHQ-RhOQjD0LbKZO&opi=89978449) that we can easily lift the accuracy to 98%+ on such simple tasks from the  CAPTCHA\ud83d\ude2e.\\n\\nThus, we also designed a [factory workflow](https://github.com/CaptchaAgent/hcaptcha-model-factory/tree/main/automation) based on this, i.e., using the same network model design, but training models for different prompt scenarios on different batches of image data. \\n\\nAlthough these small models can only handle binary classification tasks with a single target, we trade off an extreme performance experience, i.e., we go from training to iterating a model version in just a few minutes. \\n\\n## Automatic image annotation\\n\\n:::note\\n\\n[Zero shot image classification](https://huggingface.co/tasks/zero-shot-image-classification) is the task of classifying previously unseen classes during training of a model.\\n\\n:::\\n\\n![image-20231031022847507](https://r2-datalake.echosec.top/blog-obs/2023/10/6dcf0cdc5089fa33fae236ab7ab4a951.png)\\n\\nWe have been using CLIP in the factory workflow for [automatic image annotation](https://en.wikipedia.org/wiki/Automatic_image_annotation) tasks since 2022, and at that time, the accuracy of [the best CLIP model](https://github.com/mlfoundations/open_clip/blob/main/docs/openclip_classification_results.csv) in dealing with [zero-shot image classification](https://huggingface.co/tasks/zero-shot-image-classification) was not satisfactory, but it was very useful for saving your time.\\n\\nIf I chose to manually categorize 1k images, it would probably take me at least 10 minutes and my nerves would be high the whole time. Oh and at the same time you\'re going to need a processing environment that\'s just right or you\'re going to have a very slow process.\\n\\nWith CLIP, the same process takes 3 minutes. I only need to pay extremely little attention to samples that are misclassified or have low scores. \\n\\n![Default_Exaggerated_style_cartoon_where_a_girl_is_laboring_in_1_e5026ef7-6366-42b3-8215-6c9ca1887679_1](https://r2-datalake.echosec.top/blog-obs/2023/10/450ca5abdc2de3401c8f687d6952ffb2.jpg)\\n\\nIt may seem like a bit of a contradiction in terms. But if you\'ve had this experience, you should know the difficulty of <u>multi-categorizing a bunch of cluttered images</u> is quite different for human attention than <u>identifying outliers in a bunch of images with similar overall characteristics</u>.\\n\\n## Dilemmas and breakthroughs\\n\\nAt the time, we were only running CLIP on a local GPU server. we tried to run it on edge terminals and open up the inference interface, but how to export CLIP to ONNX and run inference tasks on terminals that don\'t rely on pytorch and GPUs?\\n\\nThis question stumped me. So much so that as projects like [clip-as-service](https://github.com/jina-ai/clip-as-service) started to gain traction in the industry, we tried the next best thing, which was to assume that there were enough devices in the edge network to run the CLIP model.\ud83e\udd79\\n\\nNote that you don\'t need much configuration to run the CLIP model, in the case of `RN50.openai` you only need up to 500MB of RAM to run it, and we\'re just comparing it here to ResNet (294KB) from the previous section. That is, if we choose to design the CLIP model as a hot-swappable component, we can\'t possibly require players using this program to be ready to download a 500MB model and read it frequently at any time.\\n\\nWith breakthroughs in computer vision research around the world, pre-trained models that score increasingly well are starting to emerge. [\u21aa\ufe0fbenchmarks](https://github.com/mlfoundations/open_clip/blob/main/docs/openclip_results.csv)\\n\\n> - [CLIP](https://huggingface.co/docs/transformers/main/en/model_doc/clip) supports zero-shot image classification with prompts. Given an image, you can prompt the CLIP model with a natural language query like \\"a picture of {}\\". The expectation is to get the category label as the answer.\\n> - [OWL-ViT](https://huggingface.co/docs/transformers/main/en/model_doc/owlvit) allows zero-shot object detection conditional on language and one-shot object detection conditional on image. This means that you can detect objects in a single image even if the underlying model didn\'t learn to detect them during training! You can refer to [this notebook](https://github.com/huggingface/notebooks/tree/main/examples#:~:text=zeroshot_object_detection_with_owlvit.ipynb) to learn more.\\n> - [CLIPSeg](https://huggingface.co/docs/transformers/model_doc/clipseg) supports zero-shot image segmentation conditional on language and one-shot image segmentation conditional on image. This means you can segment objects in a single image even if the underlying model didn\'t learn to segment them during training! You can refer to [this blog post](https://huggingface.co/blog/clipseg-zero-shot) that illustrates this idea. [GroupViT](https://huggingface.co/docs/transformers/model_doc/groupvit) also supports zero-shot segmentation.\\n> - [X-CLIP](https://huggingface.co/docs/transformers/main/en/model_doc/xclip) Demonstrates zero-shot generalization to video. To be precise, it supports zero-shot video classification. Check out [this notebook](https://github.com/NielsRogge/Transformers-Tutorials/blob/master/X-CLIP/Zero_shot_classify_a_YouTube_video_with_X_CLIP.ipynb) for more details.\\n\\nAt the same time, the higher the model\'s score, the larger its number of parameters usually is and the more memory it takes up. This also predisposes CLIP to be a model better suited to deal with decision-based tasks, where it is relatively too slow to respond. The fastest open-source CLIP models available with just the right number of parameters still don\'t process fast enough on the CPU.\\n\\nIn the case of the CAPTCHA, deploying and using CLIP on user endpoints seems anachronistic. This is because for CAPTCHA, the challenges involving the CV and NLP parts do not yet fully utilize the strengths of the cross-modal model. It is clear that the CLIP model is a performance overflow for CAPTCHA available worldwide.\\n\\nThat is, it specializes in a combination of abilities we don\'t yet need, but for which it can do things, we have better options in the moment.\\n\\nIt is entirely possible to opt for more targeted solutions, such as the use of small-volume models (e.g. [mobilenetv3](https://huggingface.co/timm/mobilenetv3_large_100.ra_in1k) and [EVA-02](https://github.com/baaivision/EVA/tree/master/EVA-02/asuka)) that are only valid for a specific task, but have an accuracy rate that far exceeds that of CLIP. [\u21aa\ufe0fbenchmarks](https://github.com/huggingface/pytorch-image-models/blob/main/results/benchmark-infer-amp-nchw-pt113-cu117-rtx3090.csv)\\n\\n![radar](https://r2-datalake.echosec.top/blog-obs/2023/10/d101ab93a2687bf69889c2b38cc62541.png)![summary_tab](https://r2-datalake.echosec.top/blog-obs/2023/10/8bf027fff3915204cd10e2bb7f2bc4d6.png)\\n\\n## Scenarios for the CLIP-ONNX\\n\\nAs we mentioned earlier, for the automatic image annotation and remote service scenarios, we don\'t need to export the model to ONNX, and we should instead make full use of the GPU (if available) to improve performance. \\n\\nIt is an inevitable trend that model parameters are getting larger and larger.  So based on the present and looking to the future, what are the possible application scenarios for CLIP-ONNX?\\n\\n\ud83d\udea7\\n\\n## The generation of the LLM\\n\\n### Visual Question Answering\\n\\n:::note\\n\\n[Visual Question Answering](https://huggingface.co/tasks/visual-question-answering) is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.\\n\\n:::\\n\\n![image-20231031052543037](https://r2-datalake.echosec.top/blog-obs/2023/10/2a915379c573c45234bf03f9150a8133.png)\\n\\n### LLM OpenAgents\\n\\nXLang Agents are Large Language Model-powered(LLM-powered) Agents, aiming to utilize a range of tools to enhance their capabilities, serving as user-centric intelligent agents. Currently, the XLang Agents supports three different agents focusing on different application scenarios, including:\\n\\n- **Data Agent**: The Data Agent is equipped with data-related tools, allowing it to efficiently search, handle and manipulate and visualize data. It is proficient in writing and executing code, enabling various data-related tasks.\\n- **Plugins Agent**: The Plugins Agent boasts integration with over 200 plugins from third-party sources. These plugins are carefully selected to cater to various aspects of your daily life scenarios. By leveraging these plugins, the agent can assist you with a wide range of tasks and activities.\\n- **Web Agent**: The Web Agent harnesses the power of a chrome extension to navigate and explore websites automatically. This agent streamlines the web browsing experience, making it easier for you to find relevant information, access desired resources, and so on.\\n\\n![image-20231031052746310](https://r2-datalake.echosec.top/blog-obs/2023/10/1960d1a546180a884df4a3aa7fd03d9f.png)\\n\\n### LLM with the CLIP-ONNX\\n\\n### LLM with the CaptchaAgent"},{"id":"draw-a-tight-bounding-box-around-the-x","metadata":{"permalink":"/blog/draw-a-tight-bounding-box-around-the-x","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2023-08-28-draw-a-tight-bounding-box-around-the-x/index.md","source":"@site/blog/2023-08-28-draw-a-tight-bounding-box-around-the-x/index.md","title":"Draw a tight bounding box around the X","description":"Milestone","date":"2023-08-28T00:00:00.000Z","formattedDate":"August 28, 2023","tags":[{"label":"HCI challenge","permalink":"/blog/tags/hci-challenge"}],"readingTime":0.34,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"draw-a-tight-bounding-box-around-the-x","title":"Draw a tight bounding box around the X","authors":["QIN2DIM"],"tags":["HCI challenge"],"keywords":["hcaptcha","captcha","YOLOv8","object detection","image segmentation","bounding box","ONNX","hcaptca-challenger"]},"prevItem":{"title":"ViT zero-shot image classification","permalink":"/blog/vit-zero-shot-tasks-1"},"nextItem":{"title":"Please click on the X","permalink":"/blog/please-click-on-the-x"}},"content":"## Milestone\\n\\n[[Challenge] Draw a tight bounding box around the X  #592](https://github.com/QIN2DIM/hcaptcha-challenger/issues/592)\\n\\nSimilar to the [point type challenge](../2023-08-26-please-click-on-the-x/index.md), the principle of both similar challenges is object detection.\\n\\nHowever, the output of the `bounding box` method changes from the coordinates of the center point of the bounding box to the start and end points.\\n\\n```yaml\\nprompt: Draw a tight bounding box around the gu\u0456t\u0430r.\\ntype: bounding box\\n```\\n\\n![263652272-dbe5f4f3-c141-4e35-bbca-e20917408be9](https://r2-datalake.echosec.top/blog-obs/2023/10/a8e4fd61370418f5e35ebdea07f45cba.png)"},{"id":"please-click-on-the-x","metadata":{"permalink":"/blog/please-click-on-the-x","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2023-08-26-please-click-on-the-x/index.md","source":"@site/blog/2023-08-26-please-click-on-the-x/index.md","title":"Please click on the X","description":"Milestone","date":"2023-08-26T00:00:00.000Z","formattedDate":"August 26, 2023","tags":[{"label":"hCI challenge","permalink":"/blog/tags/h-ci-challenge"}],"readingTime":0.205,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"please-click-on-the-x","title":"Please click on the X","authors":["QIN2DIM"],"tags":["hCI challenge"],"keywords":["hcaptcha","captcha","YOLOv8","object detection","ONNX","hcaptca-challenger"]},"prevItem":{"title":"Draw a tight bounding box around the X","permalink":"/blog/draw-a-tight-bounding-box-around-the-x"},"nextItem":{"title":"Bot Revolution 2023","permalink":"/blog/bot-revolution-2023"}},"content":"## Milestone\\n\\n[[Challenge] Please click on the X #588](https://github.com/QIN2DIM/hcaptcha-challenger/issues/588)\\n\\nThis is the first time we have trained the YOLOv8 model to handle a object detection task in a CAPTCHA challenge.\\n\\n```yaml\\nprompt: please click on the elephant\\ntype: point\\n```\\n\\n![263444792-8162bc5c-d13a-471f-84a7-28b22b9f3184](https://r2-datalake.echosec.top/blog-obs/2023/10/edba3bc365ef9057ae647d84877edeaa.png)"},{"id":"bot-revolution-2023","metadata":{"permalink":"/blog/bot-revolution-2023","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2023-05-15-bot-revolution/index.md","source":"@site/blog/2023-05-15-bot-revolution/index.md","title":"Bot Revolution 2023","description":"You know Who I Am \ud83e\udd16","date":"2023-05-15T00:00:00.000Z","formattedDate":"May 15, 2023","tags":[{"label":"HCI challenge","permalink":"/blog/tags/hci-challenge"}],"readingTime":0.345,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"bot-revolution-2023","title":"Bot Revolution 2023","authors":["QIN2DIM"],"tags":["HCI challenge"],"keywords":["hcaptcha","captcha","YOLOv8","object detection","Visual Question Answering","hcaptca-challenger"]},"prevItem":{"title":"Please click on the X","permalink":"/blog/please-click-on-the-x"},"nextItem":{"title":"Can Dogs Smile?","permalink":"/blog/can-dogs-smile"}},"content":"## You know Who I Am \ud83e\udd16\\n\\n![image](https://user-images.githubusercontent.com/62018067/225232056-b31da9d8-02a8-4bf0-adf6-fba10ed8bbb8.png)\\n\\n## Related Challenges\\n\\n- [[*Challenge] image label area select #82](https://github.com/QIN2DIM/hcaptcha-challenger/issues/82)\\n- [[*Challenge] image label multiple choice #176](https://github.com/QIN2DIM/hcaptcha-challenger/issues/176)\\n- [[*Challenge] Draw a tight box around the toilet #236](https://github.com/QIN2DIM/hcaptcha-challenger/issues/236)\\n- [[*Challenge] Word \u039catching #241](https://github.com/QIN2DIM/hcaptcha-challenger/issues/241)\\n- [[*Challenge] Is the highlighted dot on the bigger squirrel? #459](https://github.com/QIN2DIM/hcaptcha-challenger/issues/459)\\n- [[*Challenge] center of the owl\'s head #471](https://github.com/QIN2DIM/hcaptcha-challenger/issues/471)\\n- [[*Challenge] please click the center of the X #479](https://github.com/QIN2DIM/hcaptcha-challenger/issues/479)"},{"id":"can-dogs-smile","metadata":{"permalink":"/blog/can-dogs-smile","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2022-09-22-can-dogs-smile/index.md","source":"@site/blog/2022-09-22-can-dogs-smile/index.md","title":"Can Dogs Smile?","description":"How Do I Know If My Dog Is Smiling?","date":"2022-09-22T00:00:00.000Z","formattedDate":"September 22, 2022","tags":[{"label":"HCI challenge","permalink":"/blog/tags/hci-challenge"}],"readingTime":1.05,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"can-dogs-smile","title":"Can Dogs Smile?","authors":["QIN2DIM"],"tags":["HCI challenge"],"image":"Snipaste_2023-10-31_06-34-58.png","description":"How Do I Know If My Dog Is Smiling?","keywords":["hcaptcha","captcha","hcaptca-challenger"]},"prevItem":{"title":"Bot Revolution 2023","permalink":"/blog/bot-revolution-2023"},"nextItem":{"title":"How old is that kitten?","permalink":"/blog/how-old-is-that-kitten"}},"content":"![8373708c5b329a67f5e5590cc005f1c1](https://user-images.githubusercontent.com/62018067/191719203-c559cb80-30be-410a-826c-4e1e26e72a1a.png) ![786d9db4d6b0e56b655e1a9928cd8bd4](https://r2-datalake.echosec.top/blog-obs/2023/10/786d9db4d6b0e56b655e1a9928cd8bd4.png) ![8ffbf814f9be8156504cf4c031ac00e0](https://user-images.githubusercontent.com/62018067/191719892-65d76e4a-66f2-4486-9e69-28a5e93cc54c.png)![39d721280c9871bceee87ca2a44048f9](https://r2-datalake.echosec.top/blog-obs/2023/10/39d721280c9871bceee87ca2a44048f9.png)\\n\\n![e873ad84d2d43eebdee909cdc42558ac](https://r2-datalake.echosec.top/blog-obs/2023/10/e873ad84d2d43eebdee909cdc42558ac.png) ![fecb98d7c191502146a698730a6b59cc](https://r2-datalake.echosec.top/blog-obs/2023/10/fecb98d7c191502146a698730a6b59cc.png) ![d2f9b29a457710d949101885d9ee5c73](https://r2-datalake.echosec.top/blog-obs/2023/10/d2f9b29a457710d949101885d9ee5c73.png) ![1d167796bcd7e4cb19f3848d65af7f36](https://r2-datalake.echosec.top/blog-obs/2023/10/1d167796bcd7e4cb19f3848d65af7f36.png)\\n\\n![4e185a10d9c607114ec63ec387ebaa85](https://r2-datalake.echosec.top/blog-obs/2023/10/4e185a10d9c607114ec63ec387ebaa85.png) ![7ad6d9d14f79829b5d709f35db2ab2bf](https://user-images.githubusercontent.com/62018067/191720723-5f55fe14-e37d-4eff-8b65-cb6088201ed5.png) ![074a754761bfdd07ebbaaa291f3cb81a](https://r2-datalake.echosec.top/blog-obs/2023/10/074a754761bfdd07ebbaaa291f3cb81a.png) ![58544d18b74090aa4616bf775ec90d97](https://user-images.githubusercontent.com/62018067/191720941-70319041-82e3-4194-ab79-9dab8b23a954.png)\\n\\n## TL;TD\\n\\n**YES, BUT** it is worth mentioning that the dog is not always \\"smiling\\" when it opens its mouth, they\'re smiling because they are calm and relaxed, but sometimes it is also an expression of aggressive behavior.\\n\\nIn the challenge, it doesn\'t really matter if the dog is smiling or not. Your ability to pass the challenge depends entirely on whether the person labeling the dataset thinks the dog is smiling.\\n\\n## How Do I Know If My Dog Is Smiling?\\n\\nThe ASPCA noted, \\"This is also a gesture where a dog shows his front teeth, but a smiling dog is doing just that. He usually shows a lowered head, wagging tail, flattened ears, a soft body posture and soft, squinty eyes along with those teeth. Teeth don\'t always mean aggression\u2014it is important to consider the whole body and the context to understand what a dog is saying.\\"\\n\\n## Reading\\n\\n- [Can Dogs Actually Smile? | Hill\'s Pet](https://www.hillspet.com/dog-care/behavior-appearance/can-dogs-smile)\\n- [Can Dogs Smile? | Blog - hCaptcha](https://www.hcaptcha.com/post/can-dogs-smile)\\n\\n## Related work\\n\\n- [[Challenge] smiling \u0501og #87](https://github.com/QIN2DIM/hcaptcha-challenger/issues/87)\\n- [[Challenge] dog with closed eyes #98](https://github.com/QIN2DIM/hcaptcha-challenger/issues/98)\\n- [[Challenge] dog without a collar #115](https://github.com/QIN2DIM/hcaptcha-challenger/issues/115)\\n- [[Challenge] dog with a collar on its neck #113](https://github.com/QIN2DIM/hcaptcha-challenger/issues/113)"},{"id":"how-old-is-that-kitten","metadata":{"permalink":"/blog/how-old-is-that-kitten","editUrl":"https://github.com/CaptchaAgent/docs-source/tree/main/blog/2022-08-30-how-old-is-that-kitten/index.md","source":"@site/blog/2022-08-30-how-old-is-that-kitten/index.md","title":"How old is that kitten?","description":"Cat Age Chart with Pictures","date":"2022-08-30T00:00:00.000Z","formattedDate":"August 30, 2022","tags":[{"label":"HCI challenge","permalink":"/blog/tags/hci-challenge"}],"readingTime":0.355,"hasTruncateMarker":false,"authors":[{"name":"QIN2DIM","title":"Maintainer of CaptchaAgent","url":"https://github.com/QIN2DIM","imageURL":"https://github.com/QIN2DIM.png","key":"QIN2DIM"}],"frontMatter":{"slug":"how-old-is-that-kitten","title":"How old is that kitten?","authors":["QIN2DIM"],"tags":["HCI challenge"],"image":"7d524620139047c35387c20e1e8ab9e2-1.png","keywords":["hcaptcha","captcha","hcaptca-challenger"]},"prevItem":{"title":"Can Dogs Smile?","permalink":"/blog/can-dogs-smile"}},"content":"## Cat Age Chart with Pictures\\n\\n[Newborn Kitten Progression & Cat Age Chart with Pictures | Alley Cat Allies](https://www.alleycat.org/resources/kitten-progression/)\\n\\n![7d524620139047c35387c20e1e8ab9e2-1](https://r2-datalake.echosec.top/blog-obs/2023/10/00a48bda62e3acbac8ea005075bb0c5f.jpg)\\n\\n## Related work\\n\\n- [[Challenge] adult cat #163](https://github.com/QIN2DIM/hcaptcha-challenger/issues/163)\\n- [[Challenge] cat with large, rounded head #158](https://github.com/QIN2DIM/hcaptcha-challenger/issues/158)\\n- [[Challenge] kitten #156](https://github.com/QIN2DIM/hcaptcha-challenger/issues/156)\\n- [[Challenge] cat with long hair #150](https://github.com/QIN2DIM/hcaptcha-challenger/issues/150)\\n- [[Challenge] cat with short hair #148](https://github.com/QIN2DIM/hcaptcha-challenger/issues/148)\\n- [[Challenge] cat with thick fur #146](https://github.com/QIN2DIM/hcaptcha-challenger/issues/146)\\n- [[Challenge] baby cat #142](https://github.com/QIN2DIM/hcaptcha-challenger/issues/142)\\n- [[Challenge] Domestic Cat #68](https://github.com/QIN2DIM/hcaptcha-challenger/issues/68)"}]}')}}]);