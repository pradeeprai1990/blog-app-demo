<?php
/**
 * Template Name: Tires
 * @package almailem
 */
get_header();
while (have_posts()) : the_post();
    $page_id = get_the_ID();
    if (get_field('banner_image') != "") {
        $bg_img = get_field('banner_image');
    } else {
        $bg_img = '';
    }
    $wholesale_id = get_field('wholesale_page_id');
    $retail_id = get_field('retail_page_id');
    ?>
    <section class="am-pagehead-wrp d-flex align-items-center" style="background-image: url(<?php echo $bg_img; ?>)">
        <div class="container">
            <div class="page-heading text-center text-white">
                <h1 class="h1 mb-0 am-anim-sec"> <?php echo get_the_title(); ?></h1>
            </div>
        </div>
    </section>
    <section class="tyres-single-page">
        <div class="container">
            <ul class="nav nav-tabs tab" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="tablinks nav-link active" id="wholeSale-tab" data-toggle="tab" href="#wholeSale" role="tab" aria-controls="wholeSale" aria-selected="true">AlMailem <?php echo get_the_title($wholesale_id); ?></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="tablinks nav-link" id="retail-tab" data-toggle="tab" href="#retail" role="tab" aria-controls="retail" aria-selected="false">AlMailem <?php echo get_the_title($retail_id); ?></a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="wholeSale" role="tabpanel" aria-labelledby="wholeSale-tab">

                    <div class="">
                        <div class="row">
                            <?php
                            // tire services starts
                            $args_glass = array(
                                'post_type' => 'tire-service',
                                'posts_per_page' => -1,
                                'meta_query' => array(
                                    array(
                                        'key' => 'wholesale_or_retail',
                                        'value' => array('both', 'wholesale'),
                                        'compare' => 'IN'
                                    )
                                )
                            );

                            $services = new WP_Query($args_glass);

                            if ($services->have_posts()) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-home-services-wrp abt-new-content-wrp-services">
                                        <div class="">
                                            <div class="row">

                                                <div class="col-lg-12 text-left">
                                                    <div class="am-abt-service-txt">
                                                        <h3 class="h3 am-heading mb-lg-6 am-anim-sec is-visible"><?php echo _e('Our Tires'); ?></h3>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                </div>    
                                            </div>

                                            <div class="row" style="justify-content: center !important;">
                                                <?php
                                                while ($services->have_posts()) : $services->the_post();
                                                    $service_id = get_the_ID();
                                                    ?>

                                                    <div class="col-lg-4 col-sm-6 mb-sm-5 mb-xl-0 mb-5 mb-lg-3">
                                                        <div class="am-home-service-box position-relative am-anim-sec our-service-section is-visible">
                                                            <div class="service-image-box">
                                                                <?php
                                                                if (get_field('service_thumbnail')) {
                                                                    $image_url = get_field('service_thumbnail');
                                                                } elseif (has_post_thumbnail(c)) {
                                                                    $image = wp_get_attachment_image_src(get_post_thumbnail_id($service_id), 'medium');
                                                                    $image_url = $image[0];
                                                                }
                                                                if ($image_url != "") {
                                                                    ?>

                                                                    <figure>
                                                                        <img class="w-100" src="<?php echo $image_url; ?>" alt="<?php the_title(); ?>"/>
                                                                    </figure>
                                                                <?php } ?>
                                                            </div>
                                                            <div class="service-learn-more pl-3 mt-xl-2 mb-xl-5 pb-xl-5 pt-4 pt-xl-3 pb-4">
                                                                <h5 class="h5 text-primary"><?php the_title(); ?></h5>
                                                                <a class="service-learn-more-link stretched-link" href="<?php the_permalink(); ?>"><b>More<span class="arrow"></span></b></a>
                                                            </div>
                                                        </div>                               
                                                    </div> 

                                                <?php endwhile; ?>            
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                            wp_reset_query();
                            // tire services ends 
                            ?> 
                            <div class="col-lg-6 mt-lg-3">

                                <div class="am-pview-top-content">
                                    <?php
                                    $firsttitle = get_field('product_desc_title', $wholesale_id);
                                    if ($firsttitle !== '') {
                                        ?>
                                        <h3 class="h3 am-heading-top am-anim-sec "><?php echo $firsttitle; ?></h3>
                                    <?php } ?>
                                    <p class="mb-5 am-anim-sec"><?php echo get_field('first_description', $wholesale_id); ?></p>
                                </div>
                            </div>
                            <div class="col-lg-6 mt-lg-3 img-section">
                                <figure class="am-pview-top-img ml-auto position-relative mb-lg-0 am-anim-sec">
                                    <img src="<?php echo get_field('description_image', $wholesale_id); ?>" alt="" class="img-fluid">
                                    <span class="am-pview-top-bg am-img-bg">
                                        <img src="<?php echo get_template_directory_uri() . '/images/service-bg.svg' ?>" alt="" class="img-fluid">
                                    </span>
                                </figure>
                            </div>
                            <div class="col-lg-12">
                                <div class="am-pview-bottom-content w-100">
                                    <?php
                                    if (have_rows('product_description', $wholesale_id)) {
                                        while (have_rows('product_description', $wholesale_id)) {
                                            the_row();
                                            $sectitle = get_sub_field('second_title');
                                            if (isset($sectitle) && $sectitle !== '') {
                                                ?>

                                                <h3 class="h3 am-heading-top am-anim-sec"><?php echo $sectitle; ?></h3>

                                            <?php } ?>

                                            <p class="mb-5 am-anim-sec"><?php echo get_sub_field('second_description'); ?></p>
                                            <?php
                                        }
                                    }
                                    ?>       
                                </div>
                            </div>

                            <!--accordian-->
                            <?php
                            $i = 1;
                            if (have_rows('accodion_repepter', $wholesale_id)) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-accordion-prod am-pview-bottom-content am-anim-sec is-visible" id="accordionExample">
                                        <?php
                                        while (have_rows('accodion_repepter', $wholesale_id)) {
                                            the_row();
                                            ?>
                                            <div class="card">
                                                <div class="card-header" id="heading<?php echo $i; ?>">
                                                    <h2 class="mb-0">
                                                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse<?php echo $i; ?>" aria-expanded="true" aria-controls="collapse<?php echo $i; ?>">
                                                            <?php echo get_sub_field('accodion_repepter_title'); ?>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div id="collapse<?php echo $i; ?>" class="collapse" aria-labelledby="heading<?php echo $i; ?>" data-parent="#accordionExample"
                                                     style="">
                                                    <div class="card-body">
                                                        <p><?php echo get_sub_field('accodion_repepter_content'); ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                            $i++;
                                        }
                                        ?>
                                    </div>
                                </div>
                            <?php } ?>
                            <!--accordian-->
                            <?php
                            $desclink_retail = get_field('description_link', $wholesale_id);
                            if (get_field('description_link', $wholesale_id)) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-pview-bottom-content w-100">
                                        <a class="btn btn-primary am-btn am-anim-sec" href="<?php echo $desclink_retail['url'] ?>"><span class="am-link"><?php echo $desclink_retail['title'] ?><span class="arrow"></span></span></a>
                                    </div>
                                </div>
                            <?php } ?>
                            <?php
                            $images = get_field('product_gallery', $wholesale_id);
                            $size = 'full'; // (thumbnail, medium, large, full or custom size)
                            if ($images):
                                ?>

                                <div class="col-lg-12 am-anim-sec">
                                    <?php if (get_field('gallery_title', $wholesale_id) != '') { ?>
                                        <h3 class="h3 am-heading-top am-anim-sec mb-4 mt-5"><?php echo get_field('gallery_title', $wholesale_id); ?></h3>
                                    <?php } ?>
                                    <?php if (get_field('gallery_title_sub', $wholesale_id) != '') { ?>
                                        <p class="mb-0 mt-2 gallery_title_sub"><?php echo get_field('gallery_title_sub', $wholesale_id); ?></p>

                                        <div class="mt-4">
                                            <a class="btn btn-primary am-btn am-anim-sec" href="<?php echo get_field('contact_link', $wholesale_id); ?>"><span class="am-link"><?php echo get_field('contact_text', $wholesale_id); ?><span class="arrow"></span></span></a>
                                        </div>
                                    </div>
                                <?php } ?>  

                                <!--gallery start-->
                                <div class="col-lg-12 mob-van-slider-wrp my-5 garg_gal">
                                    <?php foreach ($images as $image): ?>
                                        <div class="slide-item-each">
                                            <figure>
                                                <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                            </figure>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <!--gallery end-->
                            <?php endif; ?>


                            <?php
                            if (have_rows('product_brands', $wholesale_id)) {
                                ?>

                                <div class="am-pview-brand pt-0 ">
                                    <div class="container">
                                        <div class="">
                                            <div class="am-brand-padding">

                                                <?php if (get_field('products_brands_title', $wholesale_id) != '') { ?>
                                                    <h3 class="h3 am-heading-top am-anim-sec "><?php echo get_field('products_brands_title', $wholesale_id); ?></h3>
                                                <?php } ?>
                                                <ul class="list-unstyled d-flex flex-wrap justify-content-lg-between mb-3 am-brand-slider_prod">
                                                    <?php
                                                    $i = 0;

                                                    while (have_rows('product_brands', $wholesale_id)):
                                                        the_row();

                                                        $src = get_field('brands_image', get_sub_field('product_brand_image'));
                                                        if (!empty($src)) {
                                                            ?>
                                                            <li class="am-anim-sec">
                                                                <img src="<?php echo $src; ?>" alt="brands" class="img-fluid">
                                                            </li>
                                                            <?php
                                                        }
                                                        $i++;

                                                    endwhile;
                                                    ?>
                                                </ul>
                                            </div>
                                        </div>
                                        <?php
                                        $brandslink = get_field('product_brand_link', $wholesale_id);
                                        if (!empty($brandslink)) {
                                            ?>
                                            <div class="text-center see-all-brand">
                                                <a class="btn btn-primary am-btn am-anim-sec " href="<?php echo $brandslink['url'] . '?id=' . $wholesale_id; ?>"><span class="am-link"><?php echo $brandslink['title']; ?><span class="arrow"></span></span></a>
                                            </div>
                                        <?php } ?>    
                                    </div>
                                </div>

                                <?php
                            }
                            ?>
                        </div>
                    </div>               

                </div>        
                <div class="tab-pane fade" id="retail" role="tabpanel" aria-labelledby="retail-tab">

                    <div class="">
                        <div class="row">
                            <div class="col-lg-6 mt-lg-5 pt-lg-5">

                                <div class="am-pview-top-content">
                                    <?php
                                    $firsttitle = get_field('product_desc_title', $retail_id);
                                    if ($firsttitle !== '') {
                                        ?>
                                        <h3 class="h3 am-heading-top am-anim-sec "><?php echo $firsttitle; ?></h3>
                                    <?php } ?>
                                    <p class="mb-5 am-anim-sec"><?php echo get_field('first_description', $retail_id); ?></p>
                                </div>
                            </div>
                            <div class="col-lg-6 mt-lg-5 pt-lg-5">
                                <figure class="am-pview-top-img ml-auto position-relative mb-lg-0 am-anim-sec">
                                    <img src="<?php echo get_field('description_image', $retail_id); ?>" alt="" class="img-fluid">
                                    <span class="am-pview-top-bg am-img-bg">
                                        <img src="<?php echo get_template_directory_uri() . '/images/service-bg.svg' ?>" alt="" class="img-fluid">
                                    </span>
                                </figure>
                            </div>
                            <?php
                            // tire services starts
                            $args_glass = array(
                                'post_type' => 'tire-service',
                                'posts_per_page' => -1,
                                'meta_query' => array(
                                    array(
                                        'key' => 'wholesale_or_retail',
                                        'value' => array('both', 'retail'),
                                        'compare' => 'IN'
                                    )
                                )
                            );

                            $services = new WP_Query($args_glass);

                            if ($services->have_posts()) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-home-services-wrp abt-new-content-wrp-services">
                                        <div class="">
                                            <div class="row">

                                                <div class="col-lg-12 text-left">
                                                    <div class="am-abt-service-txt">
                                                        <h3 class="h3 am-heading mb-lg-6 am-anim-sec is-visible"><?php echo _e('Our Services'); ?></h3>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                </div>    
                                            </div>

                                            <div class="row">
                                                <?php
                                                while ($services->have_posts()) : $services->the_post();
                                                    $service_id = get_the_ID();
                                                    ?>

                                                    <div class="col-lg-3 col-sm-6 mb-sm-5 mb-xl-0 mb-5 mb-lg-3">
                                                        <div class="am-home-service-box position-relative am-anim-sec our-service-section is-visible">
                                                            <div class="service-image-box">
                                                                <?php
                                                                if (get_field('service_retail_image')) {
                                                                    $image_url = get_field('service_retail_image');
                                                                } elseif (has_post_thumbnail(c)) {
                                                                    $image = wp_get_attachment_image_src(get_post_thumbnail_id($service_id), 'medium');
                                                                    $image_url = $image[0];
                                                                }
                                                                if ($image_url != "") {
                                                                    ?>

                                                                    <figure>
                                                                        <img class="w-100" src="<?php echo $image_url; ?>" alt="<?php the_title(); ?>"/>
                                                                    </figure>
                                                                <?php } ?>
                                                            </div>
                                                            <div class="service-learn-more pl-3 mt-xl-2 mb-xl-5 pb-xl-5 pt-4 pt-xl-3 pb-4">
                                                                <h5 class="h5 text-primary"><?php the_title(); ?></h5>
                                                                <a class="service-learn-more-link stretched-link" href="<?php the_permalink(); ?>"><b>More<span class="arrow"></span></b></a>
                                                            </div>
                                                        </div>                               
                                                    </div> 

                                                <?php endwhile; ?>            
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                            wp_reset_query();
                            // tire services ends 
                            ?> 
                            
                            <div class="col-lg-12">
                                <div class="am-pview-bottom-content w-100">
                                    <?php
                                    if (have_rows('product_description', $retail_id)) {
                                        while (have_rows('product_description', $retail_id)) {
                                            the_row();
                                            $sectitle = get_sub_field('second_title');
                                            if (isset($sectitle) && $sectitle !== '') {
                                                ?>

                                                <h3 class="h3 am-heading-top am-anim-sec"><?php echo $sectitle; ?></h3>

                                            <?php } ?>

                                            <p class="mb-5 am-anim-sec"><?php echo get_sub_field('second_description'); ?></p>
                                            <?php
                                        }
                                    }
                                    ?>       
                                </div>
                            </div>

                            <!--accordian-->
                            <?php
                            $i = 1;
                            if (have_rows('accodion_repepter', $retail_id)) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-accordion-prod am-pview-bottom-content am-anim-sec is-visible" id="accordionExample">
                                        <?php
                                        while (have_rows('accodion_repepter', $retail_id)) {
                                            the_row();
                                            ?>
                                            <div class="card">
                                                <div class="card-header" id="heading<?php echo $i; ?>">
                                                    <h2 class="mb-0">
                                                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse<?php echo $i; ?>" aria-expanded="true" aria-controls="collapse<?php echo $i; ?>">
                                                            <?php echo get_sub_field('accodion_repepter_title'); ?>
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div id="collapse<?php echo $i; ?>" class="collapse" aria-labelledby="heading<?php echo $i; ?>" data-parent="#accordionExample"
                                                     style="">
                                                    <div class="card-body">
                                                        <p><?php echo get_sub_field('accodion_repepter_content'); ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                            $i++;
                                        }
                                        ?>
                                    </div>
                                </div>
                            <?php } ?>
                            <!--accordian-->
                            <?php
                            $desclink_retail = get_field('description_link', $retail_id);
                            if (get_field('description_link', $retail_id)) {
                                ?>
                                <div class="col-lg-12">
                                    <div class="am-pview-bottom-content w-100">
                                        <a class="btn btn-primary am-btn am-anim-sec" href="<?php echo $desclink_retail['url'] ?>"><span class="am-link"><?php echo $desclink_retail['title'] ?><span class="arrow"></span></span></a>
                                    </div>
                                </div>
                            <?php } ?>
                            <?php
                            $images = get_field('product_gallery', $retail_id);
                            $size = 'full'; // (thumbnail, medium, large, full or custom size)
                            if ($images):
                                ?>

                                <div class="col-lg-12 am-anim-sec">
                                    <?php if (get_field('gallery_title', $retail_id) != '') { ?>
                                        <h3 class="h3 am-heading-top am-anim-sec mb-4 mt-5"><?php echo get_field('gallery_title', $retail_id); ?></h3>
                                    <?php } ?>
                                    <?php if (get_field('gallery_title_sub', $retail_id) != '') { ?>
                                        <p class="mb-0 mt-2 gallery_title_sub"><?php echo get_field('gallery_title_sub', $retail_id); ?></p>

                                        <div class="mt-4">
                                            <a class="btn btn-primary am-btn am-anim-sec" href="<?php echo get_field('contact_link', $retail_id); ?>"><span class="am-link"><?php echo get_field('contact_text', $retail_id); ?><span class="arrow"></span></span></a>
                                        </div>
                                    </div>
                                <?php } ?>  

                                <!--gallery start-->
                                <div class="col-lg-12 mob-van-slider-wrp my-5 garg_gal">
                                    <?php foreach ($images as $image): ?>
                                        <div class="slide-item-each">
                                            <figure>
                                                <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                            </figure>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <!--gallery end-->
                            <?php endif; ?>


                            <?php
                            if (have_rows('product_brands', $retail_id)) {
                                ?>

                                <div class="am-pview-brand pt-0 ">
                                    <div class="container">
                                        <div class="">
                                            <div class="am-brand-padding">

                                                <?php if (get_field('products_brands_title', $retail_id) != '') { ?>
                                                    <h3 class="h3 am-heading-top am-anim-sec "><?php echo get_field('products_brands_title', $retail_id); ?></h3>
                                                <?php } ?>
                                                <ul class="list-unstyled d-flex flex-wrap justify-content-lg-between mb-3 am-brand-slider_prod">
                                                    <?php
                                                    $i = 0;

                                                    while (have_rows('product_brands', $retail_id)):
                                                        the_row();

                                                        $src = get_field('brands_image', get_sub_field('product_brand_image'));
                                                        if (!empty($src)) {
                                                            ?>
                                                            <li class="am-anim-sec">
                                                                <img src="<?php echo $src; ?>" alt="brands" class="img-fluid">
                                                            </li>
                                                            <?php
                                                        }
                                                        $i++;

                                                    endwhile;
                                                    ?>
                                                </ul>
                                            </div>
                                        </div>
                                        <?php
                                        $brandslink = get_field('product_brand_link', $retail_id);
                                        if (!empty($brandslink)) {
                                            ?>
                                            <div class="text-center see-all-brand">
                                                <a class="btn btn-primary am-btn am-anim-sec " href="<?php echo $brandslink['url'] . '?id=' . $retail_id; ?>"><span class="am-link"><?php echo $brandslink['title']; ?><span class="arrow"></span></span></a>
                                            </div>
                                        <?php } ?>    
                                    </div>
                                </div>

                                <?php
                            }
                            ?>







                        </div>
                    </div>               
                </div>
            </div>
        </div>
    </section>
    <?php $product_locations = get_field('locations');
    ?>
<?php if($product_locations)
                                {?>
    <section class="secnew sec-retails ap-retail-outlets">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h2 class="h3 am-heading bt-head">Retail Outlets</h2>
                                </div>
                            </div>
                            <div class="row">
                                
                                    <?php
                                    foreach ($product_locations as $locations) {
                                    ?>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="<?php echo $locations['link']; ?>" target="_blank">
                                                <div class="retail-box">
                                                    <img src="<?php echo $locations['icon']; ?>">
                                                    <h3 class="rt-sm-head"><?php echo $locations['place'];?></h3>
                                                    <p class="rt-sm-content"><?php echo ($locations['address']); ?></p>
                                                </div>
                                            </a>
                                        </div>
                                    <?php } ?>
                                
                            </div>
                        </div>
    </section>
    <?php }?>
    <?php
endwhile;
get_footer();
?>